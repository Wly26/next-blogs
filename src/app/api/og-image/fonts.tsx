//加载和管理用于生成OG（Open Graph）图片的字体
import { config } from "../../../config";

export type FontMap = Record<
  string,
  {
    data: Buffer | ArrayBuffer;
    name: string;
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    style?: "normal" | "italic";
    lang?: string;
  }
>;
let loadedFonts: FontMap | null = null;
// 字体配置：指定了Inter字体族的两个变体：
const loadFontsRaw = async (): Promise<FontMap> => {
  return {
    // inter-semibold：半粗体版本（字重600），
    "inter-semibold": {
      name: "Inter",
      data: await fetch(
        new URL("fonts/Inter-SemiBold.ttf", config.baseUrl)
      ).then((res) => res.arrayBuffer()),
      weight: 600,
      style: "normal",
    },
    // inter-regular：常规版本（字重400）
    "inter-regular": {
      name: "Inter",
      data: await fetch(
        new URL("fonts/Inter-Regular.ttf", config.baseUrl)
      ).then((res) => res.arrayBuffer()),
      weight: 400,
      style: "normal",
    },
  };
};
// 字体加载：定义并导出一个异步函数 loadFonts，用于加载生成Open Graph图片所需的字体文件
// 缓存机制：通过 loadedFonts 变量实现简单缓存，避免重复加载字体
export const loadFonts = async (): Promise<FontMap> => {
  // 数据格式：以结构化格式返回字体数据，包括数据内容（ArrayBuffer）、名称、字重和样式等属性
  if (loadedFonts) {
    return loadedFonts;
  }
  loadedFonts = await loadFontsRaw();
  return loadedFonts;
};
