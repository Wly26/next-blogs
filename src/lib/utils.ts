//动态生成css的js库，用于合并className
//npm install clsx
// clsx 被用来安全、灵活地合并多个类名，支持条件判断、数组、对象等复杂用法。
// 它常与 Tailwind CSS 配合使用，尤其在动态生成类名时非常有用。
import { type ClassValue, clsx } from "clsx"


//自定义Tailwind主题扩展配置
//npm install tailwind-merge
// twMerge 用于解决 Tailwind 类名冲突的问题。
// 它确保在多个类名重复时，保留最具体的那个（例如 text-red-500 会覆盖 text-blue-500）。
// 常与 clsx 配合使用，用于构建安全、可维护的组件类名系统。
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
