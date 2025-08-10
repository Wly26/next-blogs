// 对 Toast 消息的统一管理，包括：

// 创建、更新、关闭 Toast 消息
// 管理 Toast 的状态（如显示、隐藏、移除）
// 提供开发者友好的 API（如 toast({ title, description })）

// 核心功能：
// toast 函数：创建新的 Toast 消息，返回包含 id、dismiss 和 update 方法的对象
// useToast Hook：提供给组件使用的自定义 Hook，返回当前 Toast 状态和操作方法
// reducer：管理 Toast 状态的 reducer 函数，处理添加、更新、关闭和删除操作

"use client"

import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

// 扩展 ToastProps 接口
type ToasterToast = ToastProps & {
  id: string; // 为每个 Toast 消息添加了必需的 id 字段，用于唯一标识
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// as const 的作用：
// 将对象及其属性标记为不可变的字面量类型
// 使得 TypeScript 能够推断出更精确的类型（"ADD_TOAST" 而不是 string）
// 提供更好的类型检查和自动补全支持

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  // count + 1: 将当前计数器值加1
  // Number.MAX_SAFE_INTEGER: JavaScript 中最大的安全整数，值为 9007199254740991 (2^53 - 1)
  // % (取模运算): 计算除法的余数
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

// State 接口定义了整个 Toast 系统的状态结构
// 包含一个 toasts 数组属性，用于存储所有当前的 Toast 消息
interface State {
  toasts: ToasterToast[]
}

// toastTimeouts 是一个 Map 数据结构，用于存储每个 Toast 的自动移除定时器
// 键（key）是 Toast 的 id 字符串
// 值（value）是 setTimeout 的返回类型

// ReturnType<typeof setTimeout> 表示 setTimeout 函数的返回值类型
// 在浏览器环境中，这是 timeout ID（数字类型）
// 使用 ReturnType 可以确保类型安全和平台兼容性
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

//它是 Toast 系统的核心 API，用于创建和管理 Toast 消息
function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

// 用于在组件中访问和管理 Toast 通知系统
// toast 函数：创建新的 Toast 消息
// dismiss 函数：关闭特定或所有 Toast 消息

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
