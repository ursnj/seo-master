# SEO Master - Search Engine Optimization Tools

**SEO Master** is a powerful all-in-one platform designed to boost your website's visibility and rankings. With features like automatic sitemap generation, customizable robots.txt creation, SEO-optimized metadata, and seamless integration with major search engines, SEO Master simplifies the process of optimizing your site for search engines. Whether you're monitoring backlinks, improving page speed, or fine-tuning on-page SEO, SEO Master offers everything you need to achieve top search engine performance.

## ✨ Features

- ⌨️ **Framework-Agnostic Integration:** Easily integrates into any framework with simple commands.
- 🌈 **Automatic Sitemap Generation:** Creates sitemaps with domain-specific crawling.
- 🛡 **Customizable Robots.txt Creation:** Generate a fully customizable robots.txt file.
- 🌍 **Image Asset Creation:** Automatically create all the necessary image assets for your website.
- 📦 **SEO-Optimized Metadata Generation:** Generate metadata to boost your website’s SEO.
- ⚙️ **Search Engine Integration:** Works with all major search engines for seamless optimization.
- 🎨 **SEO Resource Validation:** Validate key SEO elements like sitemaps, robots.txt, metadata, and other assets.

## 🕹 Sitemaps Creation and Validation

### Simple sitemap creation:

```
npx seo-master create sitemap -w https://www.nayanui.com
```

### Advanced sitemap creation:

```
npx seo-master create sitemap --website https://www.nayanui.com --depth 10 --output ./sitemap.xml --changefreq daily
```

You can also use the shorter version of this command.

```
npx seo-master create sitemap -w https://www.nayanui.com -d 10 -o ./sitemap.xml -f daily
```

You can also integrate Sitemaper with your localhost to generate sitemaps without any deployments.

```
npx seo-master create sitemap -w http://localhost:3000 -r https://www.nayanui.com -d 10 -o ./sitemap.xml -f daily
```

this case it crawl your localhost URL and replace it with replacement URL.

| Parameter         | Default                 | Usage                                                                                                                                                                 |
| ----------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --website / -w    | https://www.nayanui.com | Pass website base URL to start crawling.                                                                                                                              |
| --replacer / -r   | ''                      | Pass replacement URL to replace crawled url, this will be mostly useful to crawl localhost and replace it with original URL.                                          |
| --depth / -d      | 10                      | Pass depth to let the generator know how depth it need to crawl.                                                                                                      |
| --output / -o     | ./sitemap.xml           | Pass output to let the generator know where to keep generated sitemap.                                                                                                |
| --changefreq / -f | daily                   | Pass change frequency to let the generator know how frequently your content change, possible options are **_always, hourly, daily, weekly, monthly, yearly, never_**. |

### Sitemap validation:

```
npx seo-master validate sitemap --output ./sitemap.xml
```

You can also use the shorter version of this command.

```
npx seo-master validate sitemap -o ./sitemap.xml
```

| Parameter     | Default       | Usage                                                                     |
| ------------- | ------------- | ------------------------------------------------------------------------- |
| --output / -o | ./sitemap.xml | Pass output to let the generator know where to find and validate sitemap. |

## 🖥 Future plans

- [x] Create SEO Master CLI tool to generate and validate **sitemaps** efficiently.
- [x] Create SEO Master CLI tool to generate and validate **robots.txt** efficiently.
- [x] Create SEO Master CLI tool to generate **image assets** for your website.
- [ ] Support multiple sitemaps if website is bigger than certain limit.
- [ ] Create a web application to automatically generate and submit sitemaps, robots.txt and image assets to search engines on a schedule.

## 🤝 Contributing

We welcome all contributions. You can submit any ideas as [Pull Requests](https://github.com/ursnj/sitemaper/pulls) or as [GitHub Issues](https://github.com/ursnj/sitemaper/issues). If you'd like to improve code, check out the Development Instructions and have a good time! :)
