// 生成动态的 OG (Open Graph) 图片：
// 主要目的：创建带签名的URL来生成动态OG图片，防止他人滥用图片生成服务
// 核心函数功能：
// signOgImageParams：使用HMAC-SHA256算法对OG图片参数进行签名，创建安全签名
// verifyOgImageSignature：验证OG图片请求的真实性
// verifyOgImageSignature：验证OG图片请求的真实性

import { config } from "@/config";
import { createHmac } from "crypto";
import urlJoin from "url-join";

const secret = config.ogImageSecret;

export interface OpenGraphImageParams {
  title: string; // OG图片的主标题
  label?: string; // 可选标签（如分类或标签）
  brand?: string; // 可选品牌名称
}

export const signOgImageParams = ({
  title,
  label,
  brand,
}: OpenGraphImageParams) => {
  const valueString = `${title}.${label}.${brand}`;
  const signature = createHmac("sha256", secret)
    .update(valueString)
    .digest("hex");
  return { valueString, signature };
};

export const verifyOgImageSignature = (
  params: OpenGraphImageParams,
  signature: string
) => {
  const { signature: expectedSignature } = signOgImageParams(params);
  return expectedSignature === signature;
};

export const signOgImageUrl = (param: OpenGraphImageParams) => {
  const queryParams = new URLSearchParams();
  queryParams.append("title", param.title);
  if (param.label) {
    queryParams.append("label", param.label);
  }
  if (param.brand) {
    queryParams.append("brand", param.brand);
  }
  const { signature } = signOgImageParams(param);
  queryParams.append("s", signature);
  return urlJoin(config.baseUrl, `/api/og-image/?${queryParams.toString()}`);
};
