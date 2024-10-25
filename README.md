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

You can also integrate seo-master with your localhost to generate sitemaps without any deployments.

```
npx seo-master create sitemap -w http://localhost:3000 -r https://www.nayanui.com -d 10 -o ./sitemap.xml -f daily
```

this case it crawl your localhost URL and replace it with replacement URL.

| Name                | Parameter         | Default                 | Usage                                                                                                                                                                 |
|---------------------| ----------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Website URL         | --website / -w      | https://www.nayanui.com | Pass website base URL to start crawling.                                                                                                                              |
| Replacement Website | --replacer / -r  | ''                      | Pass replacement URL to replace crawled url, this will be mostly useful to crawl localhost and replace it with original URL.                                          |
| Crawling depth      | --depth / -d        | 10                      | Pass depth to let the generator know how depth it need to crawl.                                                                                                      |
| Output              | --output / -o       | ./sitemap.xml           | Pass output to let the generator know where to keep generated sitemap.                                                                                                |
| Change frequency    | --changefreq / -f   | daily                   | Pass change frequency to let the generator know how frequently your content change, possible options are **_always, hourly, daily, weekly, monthly, yearly, never_**. |

### Sitemap validation:

```
npx seo-master validate sitemap --output ./sitemap.xml
```

You can also use the shorter version of this command.

```
npx seo-master validate sitemap -o ./sitemap.xml
```

You can also validate sitemap.xml of your live website by passing URL.

```
npx seo-master validate sitemap --output https://www.nayanui.com/sitemap.xml --isremote true
```

| Name          | Parameter    | Default       | Usage                                                                            |
|---------------|--------------| ------------- |----------------------------------------------------------------------------------|
| Input sitemap | --input / -i | ./sitemap.xml | Pass input sitemap to let the generator know where to find and validate sitemap. |
| Is Remote     | --isremote / -ir | false        | Pass isremote true / false to the tool to know if its a local file or remote URL.   |

## 🕹 Robots.txt Creation and Validation

### Robots.txt creation:

```
npx seo-master create robots --allowed /home,/about --disallowed /admin,/security --sitemap https://www.nayanui.com/sitemap.xml --output ./robots.txt
```

You can also use the shorter version of this command.

```
npx seo-master create robots -a /home,/about -d /admin,/security -s https://www.nayanui.com/sitemap.xml -o ./robots.txt
```

| Name             | Parameter         | Default      | Usage                                                                     |
|------------------|-------------------|--------------|---------------------------------------------------------------------------|
| Allowed paths    | --allowed / -a    | ''           | Pass allowed links to allow search engines to crawling.                   |
| Disallowed paths | --disallowed / -d | ''           | Pass dis allowed links to restrict search engines from crawling.          |
| Sitemap          | --sitemap / -s   | ''           | Pass site map URL of your website.                                        |
| Output           | --output / -o    | ./robots.txt | Pass output to let the generator know where to keep generated robots.txt. |

### Robots.txt validation:

```
npx seo-master validate robots --output ./robots.txt
```

You can also use the shorter version of this command.

```
npx seo-master validate robots -o ./robots.txt
```

You can also validate robots.txt of your live website by passing URL.

```
npx seo-master validate robots --output https://www.nayanui.com/robots.txt --isremote true
```

| Name             | Parameter        | Default      | Usage                                                                             |
|------------------|------------------|--------------|-----------------------------------------------------------------------------------|
| Input Robots.txt | --input / -i     | ./robots.xml | Pass output to let the generator know where to find and validate sitemap.         |
| Is Remote        | --isremote / -ir | false        | Pass isremote true / false to the tool to know if its a local file or remote URL. |

## 🕹 Meta tags Creation and Validation

### Meta tags creation:

This will create an index.html file with all the required meta tags required for optimised SEO. once its generated you can copy generated content and change content as per your needs.

```
npx seo-master create metatags
```

### Meta tags validation:

```
npx seo-master validate metatags --website https://www.nayanui.com
```

You can also use the shorter version of this command.

```
npx seo-master validate metatags -w https://www.nayanui.com
```

| Name      | Parameter        | Default | Usage                                                     |
|-----------|------------------|---------|-----------------------------------------------------------|
| Website   | --website / -w   | ''      | Pass website link to validate meta tags required for SEO. |

## 🕹 Image Assets & Favicon creation

This will create all the required images and favicons for your website so you no need to remember all the sizes required and edit them manually.

We recommend input image is at least of 512X512 resolution for better results.

```
npx seo-master create images --image ./logo.png
```

You can also use the shorter version of this command.

```
npx seo-master create images -i ./logo.png
```

| Name             | Parameter     | Default  | Usage                                                   |
|------------------|---------------|----------|---------------------------------------------------------|
| Input image      | --image / -i  | ''       | Pass input image to generate all required assets.       |
| Output directory | --output / -o | ./images | Pass output directory to keep all the generated images. |

## 🖥 Future plans

- [x] Create SEO Master CLI tool to generate and validate **sitemaps** efficiently.
- [x] Create SEO Master CLI tool to generate and validate **robots.txt** efficiently.
- [x] Create SEO Master CLI tool to generate and validate **meta tags** for your website.
- [x] Create SEO Master CLI tool to generate **image assets** for your website.
- [ ] Support multiple sitemaps if website is bigger than certain limit.
- [ ] Create a web application to automatically generate and submit sitemaps, robots.txt and image assets to search engines on a schedule.

## 🤝 Contributing

We welcome all contributions. You can submit any ideas as [Pull Requests](https://github.com/ursnj/seo-master/pulls) or as [GitHub Issues](https://github.com/ursnj/seo-master/issues). If you'd like to improve code, check out the Development Instructions and have a good time! :)
