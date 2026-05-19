import { getCurrentPages } from "@tarojs/taro"

/**
 * 分享封面图处理工具函数
 * 功能：清理 URL 参数 → 强制裁剪 750x600 → 转 JPG 格式
 * 适配：微信好友、朋友圈、企业微信等社交平台分享规范
 * @param imgUrl 原始图片地址（可为 null/undefined/空字符串）
 * @returns 处理后的标准分享封面图地址
 */
export function getShareCoverImg(imgUrl?: string | null) {
  const DEFAULT_COVER = 'https://cos.pzhdv.cn/uploads/2026/05/22/1bba648e-f190-40ec-9e0f-9f7f73f27f0d.png'

  imgUrl = imgUrl || DEFAULT_COVER
  const pureUrl = imgUrl.split('?')[0]

  return `${pureUrl}?imageMogr2/crop/750x600/format/jpg`
}


/**
 * 处理分享标题：超长自动截断 + 默认值
 */
export const getShareTitle = (title: string | undefined | null): string => {
  if (!title) return '晖途博客';
  return title.length > 20 ? `${title.slice(0, 20)}…` : title;
};

/**
 * 获取小程序当前页面路径 + 参数
 */
export function getCurrentPageUrl() {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]

  if (!page || !page.route) return '/pages/index/index'

  const { route, options = {} } = page
  const params = new URLSearchParams(options as any)
  const query = params.toString()

  return query ? `/${route}?${query}` : `/${route}`
}
