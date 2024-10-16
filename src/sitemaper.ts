import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { URL } from 'url';
import xmlbuilder from 'xmlbuilder';

// Set to store visited URLs
const visited = new Set<string>();

// Function to fetch and parse a URL
const fetchAndParse = async (url: string, website: string): Promise<string[]> => {
  try {
    const { data } = await axios.get(url);
    const $: any = cheerio.load(data);
    const links: string[] = [];

    // Extract links from <a> tags
    $('a').each((_, element) => {
      const href = $(element).attr('href');
      if (href) {
        const absoluteUrl = new URL(href, url).href;

        // Add to links if it's part of the same domain and not visited
        if (absoluteUrl.startsWith(website) && !visited.has(absoluteUrl)) {
          links.push(absoluteUrl);
        }
      }
    });

    return links;
  } catch (error) {
    console.error(`Error fetching ${url}:`, (error as Error).message);
    return [];
  }
};

// Function to generate XML sitemap
const generateSitemap = (urls: { url: string; depth: number }[], maxDepth: number): string => {
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
      .ele('changefreq', 'weekly')
      .up() // Set change frequency to weekly
      .ele('priority', priority.toFixed(1))
      .up(); // Set priority based on depth
  });

  return root.end({ pretty: true });
};

// Main function to crawl and generate sitemap
export const crawlWebsite = async (website: string, maxDepth: number, output: string): Promise<void> => {
  const queue: { url: string; depth: number }[] = [{ url: website, depth: 0 }];
  visited.add(website);

  while (queue.length > 0) {
    const { url, depth } = queue.shift() as { url: string; depth: number };

    if (depth < maxDepth) {
      const links = await fetchAndParse(url, website);

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

  const sitemapXml = generateSitemap(urlsWithDepth, maxDepth);

  // Save the generated sitemap to a file
  writeFileSync(output, sitemapXml);
  console.log(`Sitemap saved to ${output}`);
};
