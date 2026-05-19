import { View } from '@tarojs/components'
import SkeletonBase from './SkeletonBase'

// 作者信息卡片骨架屏
export const AuthorInfoSkeleton = () => {
  return (
    <View className="flex flex-col gap-3 p-6 rounded-2xl bg-white shadow-lg">
      <View className="flex justify-center">
        <SkeletonBase className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
      </View>
      <View className="flex justify-center my-2">
        <SkeletonBase className="h-8 w-28" />
      </View>
      <View className="flex justify-between items-center">
        <View className="flex items-center">
          <SkeletonBase className="h-4 w-4" />
          <SkeletonBase className="h-4 w-8 ml-1" />
        </View>
        <View className="flex items-center">
          <SkeletonBase className="h-4 w-4" />
          <SkeletonBase className="h-4 w-12 ml-1" />
        </View>
        <View className="flex items-center">
          <SkeletonBase className="h-4 w-4" />
          <SkeletonBase className="h-4 w-16 ml-1" />
        </View>
      </View>
      <View className="flex items-center">
        <SkeletonBase className="h-6 w-6" />
        <SkeletonBase className="h-4 w-20 ml-2" />
      </View>
      <View className="space-y-2">
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-3/4" />
      </View>
    </View>
  )
}

// 经历与成就骨架屏
export const JobExperienceSkeleton = () => {
  return (
    <View className="p-8 rounded-2xl bg-white shadow-lg">
      <View className="mb-6">
        <SkeletonBase className="h-8 w-32" />
      </View>
      <View className="space-y-6">
        {[1, 2].map(i => (
          <View key={i} className="border-l-4 border-gray-200 pl-4">
            <View className="flex items-center">
              <SkeletonBase className="h-6 w-6" />
              <SkeletonBase className="h-6 w-24 ml-2" />
            </View>
            <View className="pl-8 my-1">
              <SkeletonBase className="h-4 w-40" />
            </View>
            <View className="pl-8 space-y-2">
              <SkeletonBase className="h-4 w-full" />
              <SkeletonBase className="h-4 w-4/5" />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

// 联系方式骨架屏
export const ContactMethodSkeleton = () => {
  return (
    <View className="p-6 rounded-2xl bg-white shadow-lg">
      <View className="mb-4">
        <SkeletonBase className="h-6 w-20" />
      </View>
      <View className="space-y-1">
        {[1, 2, 3, 4].map(i => (
          <View key={i} className="flex items-center p-1 rounded-lg">
            <SkeletonBase className="h-6 w-6 mr-3" />
            <View>
              <SkeletonBase className="h-4 w-14" />
              <SkeletonBase className="h-4 w-32 mt-1" />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

// 博客使命骨架屏
export const BlogMissionSkeleton = () => {
  return (
    <View className="p-8 rounded-2xl bg-white shadow-lg">
      <View className="mb-4">
        <SkeletonBase className="h-8 w-28" />
      </View>
      <View className="space-y-2">
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-3/5" />
      </View>
      <View className="mt-2 space-y-2">
        <SkeletonBase className="h-4 w-4/5" />
        <SkeletonBase className="h-4 w-3/4" />
        <SkeletonBase className="h-4 w-2/3" />
      </View>
    </View>
  )
}
