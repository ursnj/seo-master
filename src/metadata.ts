import { writeFileSync } from "fs";
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
export const generateMetaData = () => {
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
