"use client";



// npm install lucide-react
// Lucide 是一个 轻量、可定制的开源图标库，提供了一套一致风格的线性图标。
// lucide-react 是 Lucide 的 React 封装，可以方便地在 React 项目中使用这些图标。
import{ Undo } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";


export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-2 text-2xl">Page not found</p>

      <Button asChild className="mt-4">
        <Link href="/">
          <Undo className="mr-2 h-4 w-4" /> Go to homepage
        </Link>
      </Button>
    </div>
  );
};

