"use client";
import { config } from "@/config";
// Rss 是 Lucide 图标库中的一个图标组件。
// npm install lucide-react
import { Rss } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
// 主题切换按钮
import { DarkModeToggle } from "./DarkModeToggle";
import { Button } from "./ui/button";


// FunctionComponent 是 React 的类型定义，用于明确标识该函数是一个 React 组件。
// 它可以接受泛型参数来定义组件的 props 类型，例如 FunctionComponent<Props>。
// 在使用 TypeScript 时，使用 FunctionComponent 可以获得更好的类型推导和默认 props 支持。
export const Footer: FunctionComponent = () => {
  return (
    <section className="mt-8 md:mt-16 mb-12">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          © {config.blog.copyright} {new Date().getFullYear()}
        </div>
        <div className="text-xs text-muted-foreground hidden lg:block">
          <Link
            href={`https://wisp.blog/?utm_source=next-js-template&utm_medium=web&utm_campaign=${config.baseUrl}`}
          >
            Blog powered by wisp
          </Link>
        </div>
        <div>
          <Link href="/rss">
            <Button variant="ghost" className="p-2">
              <Rss className="w-4 h-4" />
            </Button>
          </Link>
          <DarkModeToggle />
        </div>
      </div>
      <div className="text-xs text-muted-foreground lg:hidden">
        <Link
          href={`https://wisp.blog/?utm_source=next-js-template&utm_medium=web&utm_campaign=${config.baseUrl}`}
        >
          Blog powered by wisp
        </Link>
      </div>
    </section>
  );
};