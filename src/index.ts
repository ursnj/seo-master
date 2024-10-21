#!/usr/bin/env node

import { readFileSync } from "fs";
import { Command } from "commander";
import { generateSitemap, validateSitemap } from "./sitemaps.js";
import { validateChangefreq, validateDepth, validateOutput, validateWebsite } from "./utils.js";
import { generateImages } from "./images.js";
import {generateMetaData, validateMetadata} from "./metadata.js";
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
  .option("-o, --output <path>", "Output path for the sitemap.xml", validateOutput)
  .action((options) => {
    const output = options.output || "./sitemap.xml";
    validateSitemap(output);
  });

create
  .command("images")
  .description("Create images for your website.")
  .option("-i, --image <path>", "Input path of source image", validateOutput)
  .option("-o, --output <path>", "Output directory path for generated images", validateOutput)
  .action((options) => {
    const image = options.image || "";
    const directory = options.image || "./icons";
    generateImages(image, directory);
  });

create
  .command("metadata")
  .description("Create metadata for your website.")
  .action(() => {
    generateMetaData();
  });

validate
  .command("metadata")
  .description("Validate SEO metadata for the given website")
  .option("-w, --website <url>", "The URL of the website to crawl", validateWebsite)
  .action((options) => {
    const website = options.website || "";
    validateMetadata(website);
  });

export { generateSitemap, validateSitemap, generateImages, generateMetaData, validateMetadata };

program.parse(process.argv);
