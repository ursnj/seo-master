#!/usr/bin/env node

import { Command } from 'commander';
import {crawlWebsite} from "./sitemaper.js";
const program = new Command();

program
  .name('sitemaper')
  .description('Simple tool for generating sitemaps for your website.')
  .version('1.0.0');

program
  .option('-w, --website <name>', 'The name of the website.')
  .option('-d, --depth <message>', 'Depth of the website to crawl.')
  .option('-o, --output <message>', 'Output path of the sitemap.xml')
  .action((options) => {
    const website = options.website || 'https://www.example.com';
    const depth = options.depth || 10;
    const output = options.output || './sitemap.xml';
    // console.log({website, depth, output});
    crawlWebsite(website, depth, output);
  });

program.parse(process.argv);
