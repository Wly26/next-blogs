import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
// npm install next-themes
// 1获取当前主题：通过 theme 或 resolvedTheme 获取当前应用的主题（例如：light 或 dark）。
// 2切换主题：通过 setTheme 方法动态切换主题。
// 3服务端渲染兼容：在服务端渲染（SSR）时避免主题闪烁（FOUC），确保主题在客户端正确加载。
// 4系统主题同步：可配置为自动跟随系统主题设置。
import { useTheme } from "next-themes";

export const DarkModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // When the component mounts on the client, update the state to indicate it is mounted
    setMounted(true);
  }, []);

  //点击按钮，切换主题样式
  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Render nothing on the server
  if (!mounted) return null;

  // Once the component has mounted, we can safely render
  return (
    <Button variant="ghost" onClick={toggleDarkMode} className="p-2">
      {resolvedTheme === "dark" ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </Button>
  );
};