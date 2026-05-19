import { View } from '@tarojs/components'
import SkeletonBase from './SkeletonBase'

// 文章详情页骨架屏
export const ArticleDetailSkeleton = () => {
  return (
    <View className="min-h-screen bg-white flex flex-col safe-area-bottom">
      <View className="flex-1 p-4 max-w-3xl mx-auto w-full box-border">
        {/* 文章头部信息 */}
        <View className="mb-8">
          {/* 标题 */}
          <SkeletonBase className="h-8 w-full mb-2" />
          <SkeletonBase className="h-8 w-4/5 mb-4" />

          {/* 日期 */}
          <View className="text-gray-400 text-xs mb-4">
            <SkeletonBase className="h-4 w-24" />
          </View>

          {/* 标签列表 */}
          <View className="flex flex-wrap gap-2">
            <SkeletonBase className="h-6 w-16 rounded-full" />
            <SkeletonBase className="h-6 w-12 rounded-full" />
            <SkeletonBase className="h-6 w-14 rounded-full" />
          </View>
        </View>

        {/* 内容区 */}
        <View className="space-y-3">
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-3/4" />

          <View className="h-4 w-full" />

          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-5/6" />
          <SkeletonBase className="h-4 w-full" />

          <View className="h-4 w-full" />

          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-2/3" />
        </View>
      </View>
    </View>
  )
}
