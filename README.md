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

## 🕹 Usage

```
npx sitemaper --website https://www.example.com --depth 10 --output ./sitemap.xml --changefreq daily
```

You can also use the shorter version of this command.

```
npx sitemaper -w https://www.example.com -d 10 -o ./sitemap.xml -f daily
```

| Parameter         | Default                 | Usage                                                                                                                                                                 |
|-------------------|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| --website / -w    | https://www.example.com | Pass website base URL to start crawling.                                                                                                                              |
| --depth / -d      | 10                      | Pass depth to let the generator know how depth it need to crawl.                                                                                                      |
| --output / -o     | ./sitemap.xml           | Pass output to let the generator know where to keep generated sitemap.                                                                                                |
| --changefreq / -f | daily                   | Pass change frequency to let the generator know how frequently your content change, possible options are ***always, hourly, daily, weekly, monthly, yearly, never***. |

## 🖥 Future plans

- Create a web application to automatically generate and submit sitemaps to search engines on a schedule.

## 🤝 Contributing

We welcome all contributions. You can submit any ideas as [Pull Requests](https://github.com/ursnj/sitemaper/pulls) or as [GitHub Issues](https://github.com/ursnj/sitemaper/issues). If you'd like to improve code, check out the Development Instructions and have a good time! :)
