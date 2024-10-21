import axios from "axios";
import * as cheerio from "cheerio";
import { readFileSync, writeFileSync } from "fs";
import { URL } from "url";
// @ts-ignore
import { parseStringPromise } from "xml2js";
import xmlbuilder from "xmlbuilder";
import ora from "ora";

// Set to store visited URLs
const visited = new Set<string>();

// Function to fetch and parse a URL
const fetchAndParse = async (url: string, website: string, spinner: any): Promise<string[]> => {
  try {
    const { data } = await axios.get(url);
    const $: any = cheerio.load(data);
    const links: string[] = [];

    // Extract links from <a> tags
    $("a").each((_: any, element: any) => {
      const href = $(element).attr("href");
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
const buildSitemap = (urls: { url: string; depth: number }[], maxDepth: number, changefreq: string, website: string, replacer: string): string => {
  const root = xmlbuilder
    .create("urlset", { version: "1.0", encoding: "UTF-8" })
    .att("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")
    .att("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance")
    .att("xsi:schemaLocation", "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd");

  root.com("Generated by Sitemaper, Know more about sitemaper @ https://www.nayanui.com/devtools/sitemaper");

  urls.forEach(({ url, depth }) => {
    const priority = (maxDepth - depth) / maxDepth; // Calculate priority based on depth (0 to 1)
    const finalUrl = !!replacer ? url.replace(website, replacer) : url;

    root
      .ele("url")
      .ele("loc", finalUrl)
      .up()
      .ele("changefreq", changefreq)
      .up() // Set change frequency to weekly
      .ele("priority", priority.toFixed(1))
      .up(); // Set priority based on depth
  });

  return root.end({ pretty: true });
};

// Main function to crawl and generate sitemap
export const generateSitemap = async (website: string, replacer: string, maxDepth: number, output: string, changefreq: string): Promise<void> => {
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
  const urlsWithDepth = Array.from(visited).map((url) => {
    const depth = url.split("/").length - website.split("/").length; // Calculate depth based on URL structure
    return { url, depth };
  });

  const sitemapXml = buildSitemap(urlsWithDepth, maxDepth, changefreq, website, replacer);

  // Save the generated sitemap to a file
  writeFileSync(output, sitemapXml);

  spinner.succeed(`Sitemap saved to ${output}`);
};

// Function to validate the sitemap file
export const validateSitemap = async (sitemapPath: string): Promise<{ status: boolean; message: string }> => {
  const spinner = ora(`Validating sitemap: ${sitemapPath}`).start(); // Start the spinner

  try {
    const sitemapContent = readFileSync(sitemapPath, "utf-8");

    // Parse the XML sitemap
    const result = await parseStringPromise(sitemapContent);

    // Check if root is <urlset>
    if (!result.urlset || !Array.isArray(result.urlset.url)) {
      throw new Error("Invalid sitemap: Root element must be <urlset>.");
    }

    // Validate each <url> entry
    result.urlset.url.forEach((entry: any) => {
      spinner.text = `Total links found ${result.urlset.url.length}, Validating ${entry.loc || entry.loc[0]}`;
      if (!entry.loc || !entry.loc[0]) {
        throw new Error("Invalid sitemap: Each <url> must contain a <loc> element.");
      }

      // Validate URL format
      try {
        new URL(entry.loc[0]);
      } catch {
        throw new Error(`Invalid URL format in sitemap: ${entry.loc[0]}`);
      }

      // Optionally validate changefreq and priority (if they exist)
      if (entry.changefreq && !["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"].includes(entry.changefreq[0])) {
        throw new Error(`Invalid <changefreq> value: ${entry.changefreq[0]}`);
      }
      if (entry.priority && (isNaN(entry.priority[0]) || entry.priority[0] < 0 || entry.priority[0] > 1)) {
        throw new Error(`Invalid <priority> value: ${entry.priority[0]}`);
      }
    });

    const message = `Sitemap is valid: ${sitemapPath}`;
    spinner.succeed(message);
    return { status: true, message: message };
  } catch (error: any) {
    const message = `Sitemap validation error: ${error.message}`;
    spinner.fail(message);
    return { status: true, message: message };
  }
};