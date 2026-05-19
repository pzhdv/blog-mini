import { View, Text } from '@tarojs/components'
import React from 'react'

interface LoadMoreProps {
  /** 是否正在加载更多 */
  loading: boolean
  /** 是否还有更多数据 */
  hasMore: boolean
  /** 列表长度，用于判断是否显示“已全部加载” */
  listLength: number
}

/**
 * 上拉加载更多 / 已加载完毕 公共组件
 * 统一在列表底部展示加载状态
 */
const LoadMore: React.FC<LoadMoreProps> = ({ loading, hasMore, listLength }) => {
  return (
    <View className="py-8 flex flex-col items-center justify-center text-sm gap-2">
      {/* 1. 加载中状态：显示旋转动画 + 文字 */}
      {loading ? (
        <View className="flex items-center gap-2 text-gray-500">
          <View className="w-4 h-4 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin"></View>
          <Text>加载中...</Text>
        </View>
      ) : hasMore ? (
        /* 2. 可上拉加载：提示用户继续上拉 */
        <View className="flex items-center gap-2 text-gray-400">
          <Text>↑</Text>
          <Text>上拉加载更多</Text>
        </View>
      ) : (
        /* 3. 全部加载完成：有数据时才展示底线文案 */
        listLength > 0 && (
          <View className="flex items-center gap-3 px-4 py-1">
            <View className="w-8 h-[1px] bg-gray-200"></View>
            <Text className="text-xs text-gray-400">已加载全部文章</Text>
            <View className="w-8 h-[1px] bg-gray-200"></View>
          </View>
        )
      )}
    </View>
  )
}

export default LoadMore
