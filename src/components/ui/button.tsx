import * as React from "react";

// npm install @radix-ui/react-slot
// @radix-ui/react-slot 是 Radix UI 提供的一个实用组件，用于实现“插槽”功能。
import { Slot } from "@radix-ui/react-slot";

// npm install class-variance-authority
// class-variance-authority 是一个为 Tailwind CSS 设计的状态驱动类名生成工具。
// 常用于构建可复用、具有多种视觉状态的 UI 组件。
// cva 允许你定义组件的不同样式变体（如：variant, size），并根据传入的 props 动态生成对应的 Tailwind 类名。
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";


const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// ButtonProps 是按钮组件的类型定义。
export interface ButtonProps
  // 它继承了原生 <button> 元素的所有 HTML 属性（如 onClick, disabled 等）。
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    // 同时通过 VariantProps<typeof buttonVariants> 自动获取由 cva 定义的样式变体类型（如 variant 和 size）。
    VariantProps<typeof buttonVariants> {
    //asChild 是一个可选属性，用于控制是否将子元素渲染为插槽（Slot），常用于组合其他组件。
    asChild?: boolean;
  }

// 使用 React.forwardRef 创建带 ref 支持的组件，使其可以传递 ref 给底层 DOM 元素。
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   解构传入的 props：
// className: 自定义类名。
// variant, size: 控制按钮样式的变体。
// asChild: 控制是否使用 <Slot /> 渲染。
  ({ className, variant, size, asChild = false, ...props }, ref) => { 
    const Comp = asChild ? Slot : "button";
    return (
      // 合并默认样式、变体样式和用户传入的 className。
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
//设置组件的显示名称为 "Button"，在 React DevTools 中更容易识别。
Button.displayName = "Button";

export { Button, buttonVariants };