#!/usr/bin/env node

import { readFileSync } from "fs";
import { Command } from "commander";
import { generateImages } from "./images.js";
import { generateSitemap, validateSitemap } from "./sitemaps.js";
import {generateMetaTags, validateMetaTags} from "./metatags.js";
import { generateRobots, validateRobots } from "./robots.js";
import { validateChangefreq, validateDepth, validateOutput, validateWebsite } from "./utils.js";
const { name, version, description } = JSON.parse(readFileSync("./package.json", "utf8"));

const program = new Command();

program
  .name(name)
  .description(description)
  .version(version)
  .action(function (this: Command) {
    this.help();
  });

const create = program
  .command("create")
  .description("Create SEO Tools")
  .action(function (this: Command) {
    this.help();
  });
const validate = program
  .command("validate")
  .description("Validate SEO Tools")
  .action(function (this: Command) {
    this.help();
  });

create
  .command("sitemap")
  .description("Create a sitemap for the given website")
  .option("-w, --website <url>", "The URL of the website to crawl", validateWebsite)
  .option("-r, --replacer <url>", "The URL of the website to be replaced", validateWebsite)
  .option("-d, --depth <number>", "Depth of the website to crawl", validateDepth)
  .option("-o, --output <path>", "Output path for the sitemap.xml", validateOutput)
  .option("-f, --changefreq <value>", "Change frequency for the sitemap (always, hourly, daily, weekly, monthly, yearly, never)", validateChangefreq)
  .action((options) => {
    const website = options.website || "https://www.nayanui.com";
    const replacer = options.replacer || "";
    const depth = options.depth || 10;
    const output = options.output || "./sitemap.xml";
    const changefreq = options.changefreq || "daily";
    generateSitemap(website, replacer, depth, output, changefreq);
  });

validate
  .command("sitemap")
  .description("Validate an existing sitemap")
  .option("-i, --input <path>", "Input path for the sitemap.xml", validateOutput)
  .option("-ir, --isremote <path>", "Pass true if robots.txt is hosted somewhere.", validateOutput)
  .action((options) => {
    const input = options.input || "./sitemap.xml";
    const isRemote = options.isremote || false;
    validateSitemap(input, isRemote);
  });

create
  .command("robots")
  .description("Create robots.txt for your website.")
  .option("-a, --allowed <path>", "Allowed paths for the robots.txt", validateOutput)
  .option("-d, --disallowed <path>", "Disallowed paths for the robots.txt", validateOutput)
  .option("-s, --sitemap <path>", "Sitemap url for the robots.txt", validateWebsite)
  .option("-o, --output <path>", "Output path for the robots.txt", validateOutput)
  .action((options) => {
    const allowed = options.allowed || "";
    const disallowed = options.disallowed || "";
    const sitemap = options.sitemap || "";
    const output = options.output || "./robots.txt";
    generateRobots(allowed, disallowed, sitemap, output);
  });

validate
  .command("robots")
  .description("Validate robots.txt for your website.")
  .option("-i, --input <path>", "Input path for the robots.txt", validateOutput)
  .option("-ir, --isremote <path>", "Pass true if robots.txt is hosted somewhere.", validateOutput)
  .action((options) => {
    const input = options.input || "./robots.txt";
    const isRemote = options.isremote || false;
    validateRobots(input, isRemote);
  });

create
  .command("metadata")
  .description("Create metadata for your website.")
  .action(() => {
    generateMetaTags();
  });

validate
  .command("metadata")
  .description("Validate SEO metadata for the given website")
  .option("-w, --website <url>", "The URL of the website to crawl", validateWebsite)
  .action((options) => {
    const website = options.website || "";
    validateMetaTags(website);
  });

create
  .command("images")
  .description("Create images for your website.")
  .option("-i, --image <path>", "Input path of source image", validateOutput)
  .option("-o, --output <path>", "Output directory path for generated images", validateOutput)
  .action((options) => {
    const image = options.image || "";
    const directory = options.image || "./images";
    generateImages(image, directory);
  });

export { generateSitemap, validateSitemap, generateImages, generateMetaTags, validateMetaTags, generateRobots, validateRobots };

program.parse(process.argv);
