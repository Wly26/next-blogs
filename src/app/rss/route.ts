// 生成一个 RSS 订阅源，专门用于博客文章。以下是它的主要功能：
// 1. 获取博客文章列表：从数据库中获取所有博客文章，并生成 RSS 订阅源。
// 2. 生成 RSS 订阅源：使用 RSS 库生成 RSS 订阅源，并设置标题、描述、作者、链接、语言、最后更新时间等属性。
// 3. 添加博客文章：将每个博客文章添加到 RSS 订阅源中，并设置标题、描述、作者、链接、发布时间等属性。
// 4. 返回 RSS 订阅源：将生成的 RSS 订阅源返回给用户。

// 每小时更新一次数据。
export const revalidate = 3600; 

// 用于构建带有自定义头信息的响应。
import { NextResponse } from "next/server";
// npm install rss
// npm install @types/rss --save-dev
// rss 是一个用于 生成 RSS 2.0 feed 的 Node.js 库。
// 在你的代码中，它被用来构建博客文章的 RSS 订阅源，以便用户或工具可以订阅内容更新。
// rss：用来生成 RSS 2.0 订阅源。
import RSS from "rss";
// npm install url-join
// 用于安全拼接 URL 路径片段的工具函数库。
import urlJoin from "url-join";
// 获取博客文章
import { wisp } from "../../lib/wisp";
import { config } from "@/config";

const baseUrl = config.baseUrl;

export async function GET() {
  const result = await wisp.getPosts({ limit: 20 });

  const posts = result.posts.map((post) => {
    return {
      title: post.title,
      description: post.description || "",
      url: urlJoin(baseUrl, `/blog/${post.slug}`),
      date: post.publishedAt || new Date(),
    };
  });

  // 这段代码创建了一个 RSS feed，
  // 并将博客文章作为条目添加进去，
  const feed = new RSS({
    title: config.blog.name,
    description: config.blog.metadata.description,
    site_url: baseUrl,
    feed_url: urlJoin(baseUrl, "/rss"),
    pubDate: new Date(),
  });
  posts.forEach((post) => {
    feed.item(post);
  });
  // 最后输出格式化的 XML 内容。
  const xml: string = feed.xml({ indent: true });

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET",
    },
  });
}
