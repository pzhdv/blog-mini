import { Article } from '@/types'
import { View, Text, Image } from '@tarojs/components'
import React from 'react'

/**
 * 文章列表项组件 Props 定义
 * @param article 单篇文章数据
 * @param onGoDetail 点击跳转到详情页
 */
interface ArticleItemProps {
  article: Article
  onGoDetail: (articleId: number) => void
}

/**
 * 文章列表项组件（首页、分类页通用）
 * 包含：封面图 + 分类标签 + 标题 + 摘要 + 发布时间
 */
const ArticleItem: React.FC<ArticleItemProps> = ({ article, onGoDetail }) => {
  return (
    <View
      onClick={() => onGoDetail(article.articleId)}
      key={article.articleId}
      className="p-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
    >
      <View className="flex flex-col gap-4">
        {/* 文章封面图 */}
        <Image
          src={article.image}
          mode="aspectFill"
          className="w-full h-48 rounded-lg"
        />

        <View className="flex-1">
          {/* 分类标签组 */}
          <View className="flex gap-1 text-sm mb-2">
            {article.articleCategoryList?.map((cat, index) => (
              <Text
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
              >
                {cat.categoryName}
              </Text>
            ))}
          </View>

          {/* 文章标题 */}
          <Text className="text-lg font-semibold mb-2 text-gray-900">
            {article.title}
          </Text>

          {/* 文章摘要（自动显示 2 行省略） */}
          <Text className="text-gray-600 line-clamp-2 my-3">
            {article.excerpt}
          </Text>

          {/* 底部：发布日期 & 阅读全文 */}
          <View className="flex justify-between items-center w-full">
            <Text className="text-sm text-gray-500">
              {article.createTime?.split(' ')[0]}
            </Text>
            <Text className="text-blue-600 text-sm">阅读全文 →</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ArticleItem
