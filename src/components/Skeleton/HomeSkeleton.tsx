import { View } from "@tarojs/components"
import { ArticleItemSkeleton } from "./ArticleSkeleton"

// 首页文章列表骨架屏
export const HomeArticleListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <View className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleItemSkeleton key={index} page='home' />
      ))}
    </View>
  )
}
