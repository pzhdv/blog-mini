import { View, Text } from '@tarojs/components'
import { navigateTo, useReachBottom } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import './index.scss'
import {
  queryCategoryListWithArticleCount,
  queryCategoryPageArticleList,
} from '@/api'
import type {
  Article,
  ArticleCategory,
  CategoryPageQueryParams,
} from '@/types'

import { collectCategoryIds, getCategoryPath, treeDataToListData } from '@/utils/common'


import ArticleItem from '@/components/ArticleItem'
import Footer from '@/components/Footer'
import LoadMore from '@/components/LoadMore'
import IconFont from '@/components/IconFont'
import {
  CategoryNavSkeleton,
  BreadcrumbSkeleton,
  CategoryArticleListSkeleton,
} from '@/components/Skeleton'
import { usePageShare } from '@/hooks/usePageShare'


// 根分类ID
const ROOT_CATEGORY_ID = 1
// 每页加载数量
const PAGE_SIZE = 4

export default function BlogCategory() {
  // ================== 分类相关状态 ==================
  // 分类树数据（用于渲染树形结构）
  const [articleCategoryTreeList, setArticleCategoryTreeList] = useState<ArticleCategory[]>([])
  // 拍平后的分类列表（用于查找父级）
  const [articleCategoryList, setArticleCategoryList] = useState<ArticleCategory[]>([])
  // 当前选中的分类ID
  const [activeCategoryId, setActiveCategoryId] = useState<number | undefined>(undefined)
  // 当前选中分类及其子分类ID集合
  const [categoryIds, setCategoryIds] = useState<number[]>([])
  // 当前分类面包屑路径
  const [currentCategoryPathList, setCurrentCategoryPathList] = useState<string[]>([])
  // 展开/收起状态管理
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  // ================== 文章列表相关状态 ==================
  // 文章列表
  const [articleList, setArticleList] = useState<Article[]>([])
  // 当前页码
  const [currentPage, setCurrentPage] = useState(1)
  // 页面加载状态
  const [loading, setLoading] = useState(false)
  // 加载更多状态
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  // 是否还有更多数据
  const [hasMore, setHasMore] = useState(false)

  // ================== 微信分享配置 ==================
  // 转发给微信好友/群聊 和 分享到微信朋友圈
  usePageShare('晖途博客 · 文章分类');



  // ================== 上拉加载更多监听 ==================
  useReachBottom(() => {
    if (hasMore && !loading && !isLoadingMore) {
      handleLoadMore()
    }
  })

  // ================== 页面初始化 ==================
  useEffect(() => {
    initFetch(ROOT_CATEGORY_ID)
  }, [])

  /**
   * 初始化请求：加载分类树 + 默认分类文章
   */
  const initFetch = async (parentId: number) => {
    try {
      setLoading(true)
      // 获取分类树形结构
      const res = await queryCategoryListWithArticleCount(parentId)
      const treeList = res.data || []
      const flatList = treeDataToListData(treeList)

      if (treeList.length > 0) {
        const firstCat = treeList[0]
        const catIds = collectCategoryIds(firstCat)

        // 获取默认分类下的文章
        const articleRes = await queryCategoryPageArticleList({
          pageNum: 1,
          pageSize: PAGE_SIZE,
          categoryIds: catIds,
        })

        // 更新分类数据
        setArticleCategoryTreeList(treeList)
        setArticleCategoryList(flatList)
        setActiveCategoryId(firstCat.categoryId)
        setCurrentCategoryPathList([firstCat.categoryName])
        setCategoryIds(catIds)

        // 更新文章数据
        setArticleList(articleRes.data.records)
        setCurrentPage(1)
        setHasMore(articleRes.data.records.length < articleRes.data.total)
      }
    } catch (err) {
      console.error('初始化失败', err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * 查询分类下的文章列表
   * @param params 请求参数
   * @param isLoadMore 是否加载更多
   */
  const queryArticleList = async (params: CategoryPageQueryParams, isLoadMore = false) => {
    if (loading && isLoadMore) return

    try {
      if (isLoadMore) setIsLoadingMore(true)
      else setLoading(true)
      const res = await queryCategoryPageArticleList(params)
      const newList = res.data.records || []
      const total = res.data.total || 0
      // 加载更多 → 追加；切换分类 → 覆盖
      if (isLoadMore) {
        setArticleList(prev => [...prev, ...newList])
      } else {
        setArticleList(newList)
      }

      setCurrentPage(params.pageNum || 1)
      setHasMore((isLoadMore ? articleList.length + newList.length : newList.length) < total)
    } catch (err) {
      console.error('查询失败', err)
    } finally {
      setLoading(false)
      setIsLoadingMore(false)
    }
  }

  /**
   * 上拉加载更多
   */
  const handleLoadMore = async () => {
    const nextPage = currentPage + 1
    await queryArticleList(
      {
        pageNum: nextPage,
        pageSize: PAGE_SIZE,
        categoryIds,
      },
      true
    )
  }


  /**
   * 点击分类：切换当前分类并刷新文章
   */
  const handleCategoryClick = async (category: ArticleCategory) => {
    const catIds = collectCategoryIds(category)
    setActiveCategoryId(category.categoryId)
    setCategoryIds(catIds)
    setCurrentCategoryPathList(getCategoryPath(category, articleCategoryList))
    await queryArticleList({
      pageNum: 1,
      pageSize: PAGE_SIZE,
      categoryIds: catIds,
    })
  }

  /**
   * 切换分类展开/收起状态
   */
  const toggleExpand = (id: number) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }))
  }

  /**
   * 跳转到文章详情
   */
  const toDetail = (articleId: number) => {
    navigateTo({ url: `/pages/detail/index?articleId=${articleId}` })
  }

  /**
   * 递归渲染分类树
   */
  const renderCategoryTree = (items: ArticleCategory[], level = 0) => {
    return items.map(category => (
      <View
        key={category.categoryId}
        className={`relative ${level > 0 ? 'ml-3' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <View className="flex items-center gap-1">
          {/* 分类项：点击切换分类 */}
          <View
            onClick={() => handleCategoryClick(category)}
            className={`flex-1 flex items-center gap-1.5 px-2 py-2 rounded-lg text-left transition-colors ${activeCategoryId === category.categoryId ? 'bg-blue-100 text-[#2563eb]' : 'text-gray-700'} ${level > 0 ? 'text-sm' : 'text-sm font-medium'}`}
          >
            <Text className={activeCategoryId === category.categoryId ? 'text-[#2563eb]' : 'text-gray-500'}>
              <IconFont iconClass={category.iconClass} size={16} />
            </Text>
            <Text className="flex-1 truncate">{category.categoryName}</Text>
            <Text className="text-xs text-gray-400">{category.articleTotal}</Text>
          </View>

          {/* 子分类展开/收起按钮 */}
          {category.children && category.children.length > 0 && (
            <View
              onClick={() => toggleExpand(category.categoryId)}
              className="w-8 h-8 flex items-center justify-center rounded-lg"
            >
              {expandedCategories[category.categoryId] ? (
                <IconFont iconClass="iconfont icon-zhankai" size={16} color="#9ca3af" />
              ) : (
                <IconFont iconClass="iconfont icon-zhedie" size={18} color="#9ca3af" />
              )}
            </View>
          )}
        </View>

        {/* 递归渲染子分类 */}
        {category.children && expandedCategories[category.categoryId] && (
          <View className="ml-3 pl-2 border-l border-gray-200">
            {renderCategoryTree(category.children, level + 1)}
          </View>
        )}
      </View>
    ))
  }


  return (
    <View className="min-h-screen bg-gray-50">
      {/* 让内部容器撑满全屏，flex 布局 */}
      <View className="flex flex-col min-h-screen">
        {/* 内容区域：自动占满剩余高度 */}
        <View className="flex-1 p-4">
          {/* 分类导航 */}
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            {articleCategoryTreeList.length === 0 && loading ? (
              <CategoryNavSkeleton />
            ) : (
              renderCategoryTree(articleCategoryTreeList)
            )}
          </View>

          {/* 面包屑导航 */}
          <View className="flex items-center text-sm text-gray-500 mb-4">
            {loading ? (
              <BreadcrumbSkeleton />
            ) : (
              currentCategoryPathList.map((item, i) => (
                <Text key={i} className="mr-2">
                  {i > 0 && '/'} {item}
                </Text>
              ))
            )}
          </View>

          {/* 文章列表 */}
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {articleList.length === 0 && loading ? (
              <CategoryArticleListSkeleton count={PAGE_SIZE} />
            ) : articleList.length === 0 ? (
              <View className="h-48 flex items-center justify-center text-gray-500">
                <Text>暂无文章</Text>
              </View>
            ) : (
              <View className="space-y-3">
                {articleList.map(article => (
                  <ArticleItem
                    key={article.articleId}
                    article={article}
                    onGoDetail={toDetail}
                  />
                ))}
              </View>
            )}
          </View>

          {/* 加载更多状态 */}
          <LoadMore
            loading={isLoadingMore}
            hasMore={hasMore}
            listLength={articleList.length}
          />
        </View>

        {/* Footer 内容少贴底，内容多在最下方 */}
        <Footer />
      </View>
    </View>
  )
}
