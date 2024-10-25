import { writeFileSync } from "fs";
import axios from "axios";
import * as cheerio from "cheerio";
import ora from "ora";

// Dummy data
const title = "Your Page Title";
const description = "A brief description of your page's content, optimized for SEO.";
const keywords = "SEO, meta tags, web development, Open Graph";
const url = "https://www.example.com";
const imageUrl = "https://www.example.com/image.jpg";
const faviconPath = "/favicon.ico"; // Path to your favicon
const appleIconPath = "/apple-touch-icon.png"; // Path to your Apple touch icon
const filePath = "./index.html"; // Path to save the index.html file

// Function to generate SEO meta tags as HTML
export const generateMetaTags = () => {
  const spinner = ora(`Generating metadata`).start(); // Start the spinner
  const metaTags = [
    { name: "charset", content: "UTF-8" }, // Character encoding
    { name: "viewport", content: "width=device-width, initial-scale=1.0" }, // Responsive design
    { name: "robots", content: "index, follow" }, // Tells search engines to index and follow links

    { name: "title", content: title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },

    // Open Graph (OG) tags for social media sharing
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },

    // Twitter card tags for better Twitter integration
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },

    // Canonical link to avoid duplicate content issues
    { name: "canonical", content: url },
  ];

  // HTML icon links for favicons and Apple touch icons
  const iconLinks = [
    { rel: "icon", href: faviconPath },
    { rel: "apple-touch-icon", href: appleIconPath },
  ];

  // Generate the meta tags as an HTML string
  const metaHTML = metaTags
    .map((tag: any) => {
      if (tag.name) {
        if (tag.name === "charset") {
          return `<meta charset="${tag.content}">`; // Special case for charset
        }
        return `<meta name="${tag.name}" content="${tag.content}">`;
      } else if (tag.property) {
        return `<meta property="${tag.property}" content="${tag.content}">`;
      }
      return "";
    })
    .join("\n");

  // Generate the icon links as an HTML string
  const iconHTML = iconLinks.map((icon) => `<link rel="${icon.rel}" href="${icon.href}">`).join("\n");

  // Return the complete HTML meta tags, including title, icons, and meta tags
  const htmlContent = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>${title}</title>\n${metaHTML}\n<link rel="canonical" href="${url}">\n${iconHTML}\n</head>\n<body></body>\n</html>`;
  writeFileSync(filePath, htmlContent);
  spinner.succeed(`Metadata created at ${filePath}`);
};

// Function to crawl the website and check if all required tags exist
export const validateMetaTags = async (url: string) => {
  const spinner = ora(`Validating SEO metadata for: ${url}`).start(); // Start the spinner
// List of required meta tags
  const requiredTags = [
    { name: "meta[charset]", selector: "meta[charset]" },
    { name: "meta[viewport]", selector: "meta[name='viewport']" },
    { name: "meta[title]", selector: "title" },
    { name: "meta[description]", selector: "meta[name='description']" },
    { name: "meta[keywords]", selector: "meta[name='keywords']" },
    { name: "meta[canonical]", selector: "link[rel='canonical']" },
    { name: "meta[robots]", selector: "meta[name='robots']" },

    // Open Graph (og:) tags
    { name: "meta[og:title]", selector: "meta[property='og:title']" },
    { name: "meta[og:description]", selector: "meta[property='og:description']" },
    { name: "meta[og:type]", selector: "meta[property='og:type']" },
    { name: "meta[og:url]", selector: "meta[property='og:url']" },
    { name: "meta[og:image]", selector: "meta[property='og:image']" },

    // Twitter tags
    { name: "meta[twitter:card]", selector: "meta[name='twitter:card']" },
    { name: "meta[twitter:title]", selector: "meta[name='twitter:title']" },
    { name: "meta[twitter:description]", selector: "meta[name='twitter:description']" },
    { name: "meta[twitter:image]", selector: "meta[name='twitter:image']" },

    // Favicon and Apple Touch Icon
    { name: "link[favicon]", selector: "link[rel='icon'], link[rel='shortcut icon']" },
    { name: "link[apple-touch-icon]", selector: "link[rel='apple-touch-icon']" }
  ];
  try {
    // Fetch the website content
    const { data } = await axios.get(url);

    // Load the website content into cheerio for parsing
    const $: any = cheerio.load(data);

    // Array to collect missing tags
    const missingTags: string[] = [];

    // Validate each required tag
    requiredTags.forEach(tag => {
      if (!$(tag.selector).length) {
        missingTags.push(tag.name);
      }
    });

    if (missingTags.length > 0) {
      spinner.fail(`Missing tags on ${url}: ` + missingTags.join(", "));
    } else {
      spinner.succeed(`All required tags are present on ${url}`);
    }
  } catch (error: any) {
    spinner.fail(`Error while fetching the website: ${error.message}`);
  }
};
