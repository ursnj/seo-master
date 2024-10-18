# Sitemaper - Powerful Sitemap Generator

**Sitemaper** is a powerful sitemap generator designed to simplify the process of creating accurate and efficient sitemaps for websites. It crawls through your site, maps its structure, and generates an optimized sitemap, helping improve SEO and site visibility. With customizable options for depth, frequency, and output paths, Sitemaper is a versatile tool for developers and site owners aiming to keep their web presence indexed properly.

## ✨ Features

- ⌨️ Framework Agnostic Integration.
- 🌈 Automatic Sitemap Generation.
- 🛡 Supports Large Websites.
- 🌍 Domain Specific Crawling.
- ⚙️ Customizable Crawling Depth.
- 📦 Customizable Output Path.
- 🎨 Flexible Change Frequency.

## 🕹 CLI Usage

### Simple usage:

```
npx sitemaper -w https://www.nayanui.com
```
### Advanced Usage:

```
npx sitemaper --website https://www.nayanui.com --depth 10 --output ./sitemap.xml --changefreq daily
```

You can also use the shorter version of this command.

```
npx sitemaper -w https://www.nayanui.com -d 10 -o ./sitemap.xml -f daily
```

You can also integrate Sitemaper with your localhost to generate sitemaps without any deployments.

```
npx sitemaper -w http://localhost:3000 -r https://www.nayanui.com -d 10 -o ./sitemap.xml -f daily
```

this case it crawl your localhost URL and replace it with replacement URL.

| Parameter         | Default                 | Usage                                                                                                                                                                 |
|-------------------|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| --website / -w    | https://www.nayanui.com | Pass website base URL to start crawling.                                                                                                                              |
| --replacer / -r   | ''                    | Pass replacement URL to replace crawled url, this will be mostly useful to crawl localhost and replace it with original URL.                                                                                                         |
| --depth / -d      | 10                      | Pass depth to let the generator know how depth it need to crawl.                                                                                                      |
| --output / -o     | ./sitemap.xml           | Pass output to let the generator know where to keep generated sitemap.                                                                                                |
| --changefreq / -f | daily                   | Pass change frequency to let the generator know how frequently your content change, possible options are ***always, hourly, daily, weekly, monthly, yearly, never***. |

## 🕹 Programatic Usage

You can also use Sitemaper programmatically with Node.js. Check out the implementation below.

```
import { generateSitemap, validateSitemap } from 'sitemaper';

generateSitemap('https://www.nayanui.com', '', 10, './sitemap.xml', 'daily');

validateSitemap('./sitemap.xml'); 

```

## 🖥 Future plans

- [x] Create Sitemaper CLI tool to generate sitemaps efficiently.
- [x] Create Sitemaper programatic API's to generate sitemaps efficiently.
- [ ] Support multiple sitemaps if website is bigger than certain limit.
- [ ] Create a web application to automatically generate and submit sitemaps to search engines on a schedule.

## 🤝 Contributing

We welcome all contributions. You can submit any ideas as [Pull Requests](https://github.com/ursnj/sitemaper/pulls) or as [GitHub Issues](https://github.com/ursnj/sitemaper/issues). If you'd like to improve code, check out the Development Instructions and have a good time! :)
