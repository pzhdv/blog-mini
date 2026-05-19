import { View } from '@tarojs/components'
import SkeletonBase from './SkeletonBase'
import { ArticleItemSkeleton } from './ArticleSkeleton'

// 分类导航骨架屏

export const CategoryNavSkeleton = () => {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm">
      {/* 关键：flex-1 让左边自动占满剩余空间 */}
      <View className="flex items-center gap-3 px-2 py-2">
        {/* 左边撑满 */}
        <SkeletonBase className="h-8 flex-1" />
        {/* 右边固定宽度 */}
        <SkeletonBase className="h-4 w-6 shrink-0" />
      </View>
    </View>
  )
}

// 面包屑骨架屏
export const BreadcrumbSkeleton = () => {
  return (
    <View className="flex items-center text-sm mb-4">
      <SkeletonBase className="h-4 w-12" />
      <SkeletonBase className="h-4 w-10 mx-2" />
      <SkeletonBase className="h-4 w-20" />
    </View>
  )
}

// 分类页文章列表骨架屏
export const CategoryArticleListSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleItemSkeleton key={index} page="category" />
      ))}
    </View>
  )
}


