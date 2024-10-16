import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { URL } from 'url';
import xmlbuilder from 'xmlbuilder';
import ora from 'ora'; // Import ora for loader

// Set to store visited URLs
const visited = new Set<string>();

// Function to fetch and parse a URL
const fetchAndParse = async (url: string, website: string, spinner: any): Promise<string[]> => {
  try {
    const { data } = await axios.get(url);
    const $: any = cheerio.load(data);
    const links: string[] = [];

    // Extract links from <a> tags
    $('a').each((_: any, element: any) => {
      const href = $(element).attr('href');
      if (href) {
        const absoluteUrl = new URL(href, url).href;

        // Add to links if it's part of the same domain and not visited
        if (absoluteUrl.startsWith(website) && !visited.has(absoluteUrl)) {
          links.push(absoluteUrl);
        }
      }
    });

    spinner.text = `Total links found ${visited.size}, Found ${links.length} new links on ${url}`;
    return links;
  } catch (error) {
    spinner.fail(`Error fetching ${url}: ${(error as Error).message}`);
    return [];
  }
};

// Function to generate XML sitemap
const generateSitemap = (urls: { url: string; depth: number }[], maxDepth: number, changefreq: string): string => {
  const root = xmlbuilder
    .create('urlset', { version: '1.0', encoding: 'UTF-8' })
    .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .att(
      'xsi:schemaLocation',
      'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'
    );

  urls.forEach(({ url, depth }) => {
    const priority = (maxDepth - depth) / maxDepth; // Calculate priority based on depth (0 to 1)
    root
      .ele('url')
      .ele('loc', url)
      .up()
      .ele('changefreq', changefreq)
      .up() // Set change frequency to weekly
      .ele('priority', priority.toFixed(1))
      .up(); // Set priority based on depth
  });

  return root.end({ pretty: true });
};

// Main function to crawl and generate sitemap
export const crawlWebsite = async (website: string, maxDepth: number, output: string, changefreq: string): Promise<void> => {
  const spinner = ora(`Crawling website: ${website}`).start(); // Start the spinner

  const queue: { url: string; depth: number }[] = [{ url: website, depth: 0 }];
  visited.add(website);

  while (queue.length > 0) {
    const { url, depth } = queue.shift() as { url: string; depth: number };

    if (depth < maxDepth) {
      const links = await fetchAndParse(url, website, spinner);

      // Add links to the queue for the next level of crawling
      for (const link of links) {
        if (!visited.has(link)) {
          visited.add(link);
          queue.push({ url: link, depth: depth + 1 });
        }
      }
    }
  }

  // Prepare the URLs with their corresponding depth for the sitemap
  const urlsWithDepth = Array.from(visited).map(url => {
    const depth = url.split('/').length - website.split('/').length; // Calculate depth based on URL structure
    return { url, depth };
  });

  const sitemapXml = generateSitemap(urlsWithDepth, maxDepth, changefreq);

  // Save the generated sitemap to a file
  writeFileSync(output, sitemapXml);

  spinner.succeed(`Sitemap saved to ${output}`);
};
