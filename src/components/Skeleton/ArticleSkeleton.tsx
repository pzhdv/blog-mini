import { View } from '@tarojs/components'
import SkeletonBase from './SkeletonBase'


type PageType = 'home' | 'category'

// 文章列表项骨架屏
export const ArticleItemSkeleton = ({ page }: { page: PageType }) => {
  return (
    <View className="p-4 border-b border-gray-200">
      <View className="flex flex-col gap-4">
        {/* 文章封面图 */}
        <SkeletonBase className="w-full h-48 rounded-lg" />

        <View className="flex-1">
          {/* 分类标签组 */}
          {
            page === 'category' && (
              <View className="flex gap-1 text-sm mb-2">
                <SkeletonBase className="h-5 w-12 rounded-full" />
                <SkeletonBase className="h-5 w-16 rounded-full" />
                <SkeletonBase className="h-5 w-16 rounded-full" />
              </View>
            )
          }

          {/* 文章标题 */}
          <SkeletonBase className="h-5 w-full mb-2" />
          <SkeletonBase className="h-5 w-3/4 mb-3" />

          {/* 文章摘要 */}
          <SkeletonBase className="h-4 w-full mb-1" />
          <SkeletonBase className="h-4 w-5/6 mb-3" />

          {/* 底部：发布日期 & 阅读全文 */}
          <View className="flex justify-between items-center w-full">
            <SkeletonBase className="h-4 w-24" />
            <SkeletonBase className="h-4 w-20" />
          </View>
        </View>
      </View>
    </View>
  )
}

