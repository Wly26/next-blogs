// 渲染博客文章内容
"use client";
import { GetPostResult } from "@/lib/wisp";
import Link from "next/link";

// npm install sanitize-html
// npm install @types/sanitize-html --save-dev
// 一个流行的 Node.js 库，用于清理 HTML 输入内容，通过剥离或转义潜在的有害内容来确保安全性。
// sanitize：这是该库提供的主要函数，用于对 HTML 字符串进行清理处理
// defaults：这是一个包含清理器默认配置选项的对象
import sanitize, { defaults } from "sanitize-html";

export const PostContent = ({ content }: { content: string }) => {
  const sanitizedContent = sanitize(content, {
    allowedTags: [
      "b",
      "br",
      "i",
      "em",
      "strong",
      "a",
      "img",
      "h1",
      "h2",
      "h3",
      "code",
      "pre",
      "p",
      "li",
      "ul",
      "ol",
      "blockquote",
      // tables
      "td",
      "th",
      "table",
      "tr",
      "tbody",
      "thead",
      "tfoot",
      "small",
      "div",
      "iframe",
    ],
    allowedAttributes: {
      ...defaults.allowedAttributes,
      "*": ["style"],
      iframe: ["src", "allowfullscreen", "style"],
    },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
  });
  return (
    <div
      className="blog-content mx-auto"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    ></div>
  );
};

export const BlogPostContent = ({ post }: { post: GetPostResult["post"] }) => {
  if (!post) return null;
  const { title, publishedAt, createdAt, content, tags } = post;
  return (
    <div>
      <div className="prose lg:prose-xl dark:prose-invert mx-auto lg:prose-h1:text-4xl mb-10 lg:mt-20 break-words">
        <h1>{title}</h1>
        <PostContent content={content} />

        <div className="mt-10 opacity-40 text-sm">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.name}`}
              className="text-primary mr-2"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
        <div className="text-sm opacity-40 mt-4">
          {Intl.DateTimeFormat("en-US").format(
            new Date(publishedAt || createdAt)
          )}
        </div>
      </div>
    </div>
  );
};
