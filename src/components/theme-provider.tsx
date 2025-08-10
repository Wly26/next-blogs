"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// npm install next-themes
// import { type ThemeProviderProps } from "next-themes/dist/types";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}