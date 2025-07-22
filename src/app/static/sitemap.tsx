// 动态生成网站的 sitemap（站点地图）：
// 主要用途：
// 该文件定义了一个 sitemap，
// 使用了 Next.js 提供的 MetadataRoute.Sitemap 类型。
// 通过它，可以帮助搜索引擎了解网站中有哪些页面可以被爬取，从而提升网站的 SEO 效果。

// 静态路径：
// 在 staticPaths 数组中列出了需要包含在 sitemap 中的静态页面路径，当前只有 "about" 页面。

// 生成 URL：
// 对于 staticPaths 中的每一个路径，
// 使用 urlJoin 方法将 config.baseUrl 和路径拼接成完整的 URL。

// 每个 sitemap 条目的属性：
// 每个条目包含以下信息：
// url：页面的完整 URL。
// lastModified：页面最后修改的时间（这里设置为当前时间）。
// priority：页面的优先级（范围从 0.0 到 1.0），当前设置为 0.9。


// 导出函数：
// sitemap 函数返回 sitemap 条目列表，
// Next.js 会根据这些信息动态生成 sitemap.xml 文件，供搜索引擎抓取使用。







import { config } from "@/config";
import type { MetadataRoute } from "next";
import urlJoin from "url-join";

const staticPaths = ["about"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = staticPaths.map((path) => ({
    url: urlJoin(config.baseUrl, path),
    lastModified: new Date(),
    priority: 0.9,
  }));
  return paths;
}
