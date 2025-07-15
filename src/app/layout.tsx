import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// 使用工具类 cn
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

import "./globals.css";

// antd UI
import { AntdRegistry } from '@ant-design/nextjs-registry';

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });


export const metadata: Metadata = {
  title: "练习案例-博客系统​",
  description: "练习1",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-6xl m-auto",
          fontSans.variable
        )}
      >
        {/* antd UI解决闪烁问题 */}
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
