import { getCurrentPageUrl, getShareCoverImg, getShareTitle } from "@/utils/share"
import { useShareAppMessage, useShareTimeline } from "@tarojs/taro"

/**
 * 页面统一分享封装 Hook（微信好友 + 朋友圈）
 * 使用前必须在页面配置开启：
 * enableShareAppMessage: true,
 * enableShareTimeline: true
 *
 * @param title 分享标题
 * @param imageUrl 自定义分享封面（可选）
 */
export function usePageShare(title: string, imageUrl?: string) {
  const shareImage = getShareCoverImg(imageUrl)
  const shareTitle = getShareTitle(title)
  const currentUrl = getCurrentPageUrl()

  // 分享给好友
  useShareAppMessage(() => ({
    title: shareTitle,
    path: currentUrl,
    imageUrl: shareImage,
  }))

  // 分享到朋友圈
  useShareTimeline(() => ({
    title: shareTitle,
    imageUrl: shareImage,
  }))
}
