import { config } from "@/config";
// npm install @wisp-cms/client
// "@wisp-cms/client" 是一个 TypeScript 客户端库，
// 用于与 Wisp CMS 后端服务进行交互。
// buildWispClient	：用于创建 Wisp CMS 的客户端实例，需传入 blogId
// GetPostsResult	：获取文章列表的返回值类型
// GetPostResult	：	获取单篇文章的返回值类型
import {
  buildWispClient,
  GetPostsResult,
  GetPostResult,
} from "@wisp-cms/client";

export const wisp = buildWispClient({
  blogId: config.wisp.blogId,
});

export type { GetPostsResult, GetPostResult };
