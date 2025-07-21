"use client";
// npm install @tanstack/react-query
// 一个用于管理 异步数据请求（如 API 请求） 的 React 库，
// 它帮助开发者更高效地处理 数据获取、缓存、同步和更新 等操作。
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 是 Next.js 提供的一个函数，用于动态导入组件，
// 实现按需加载（懒加载），常用于优化应用性能。
import dynamic from "next/dynamic";

// 主题样式 
const NextThemeProvider = dynamic(
  () => import("next-themes").then((mod) => mod.ThemeProvider),
  {
    ssr: false,
  }
);
// 解释：
// dynamic 按需加载（懒加载）
// const NextThemeProvider = dynamic(
//   () => {
//     // 引入主题
//     return import("next-themes").then((mod) => {
//       // mod 是 import("next-themes") 返回的模块对象。
//       // mod.ThemeProvider 是 next-themes 提供的 React 上下文组件（Context Provider），用于在组件树中传递当前主题。
//       // mod.ThemeProvider 基于 React 的 Context API 实现，使得应用中的子组件可以访问当前主题（theme）状态，并响应主题变化。
//       return mod.ThemeProvider;
//     });
//   },
//   {
//     // 该组件不在服务器端渲染
//     ssr: false,
//   }
// );



const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* 
      为整个应用提供统一的 React Query 客户端实例 QueryClientProvider 通过 React的 Context API，
      使得其包裹的所有子组件都可以访问同一个 queryClient实例，用于执行数据请求、缓存、更新等操作。 

      启用 React Query 的功能 只有在QueryClientProvider 内部的组件，才能使用 useQuery, 
      useMutation 等 React Query 提供的 Hook。 
      
      支持多个客户端（可选） 虽然一般一个应用只需要一个QueryClient，
      但你也可以嵌套多个 QueryClientProvider来创建不同的作用域（不常见）。 
      */}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextThemeProvider>
  );
};
