import { View, Text, Input, ScrollView } from '@tarojs/components'
import { createSelectorQuery, navigateTo } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { useEffect, useState, useCallback } from 'react'
import { usePageShare } from '@/hooks/usePageShare'


import { queryHomePageArticleList } from '@/api'
import { Article } from '@/types'
import { debounce } from '@/utils/performance'

import Footer from '@/components/Footer'
import IconFont from '@/components/IconFont'
import ArticleItem from '@/components/ArticleItem'
import LoadMore from '@/components/LoadMore'
import { HomeArticleListSkeleton } from '@/components/Skeleton'

/** 分页大小：每页请求5条数据 */
const PAGE_SIZE = 5
/** 上拉加载触发阈值：距离底部50px时触发加载更多 */
const LOAD_MORE_THRESHOLD = 50
/** 获取系统窗口高度，用于计算滚动区域高度 */
const { windowHeight } = Taro.getWindowInfo()

export default function BlogCategory() {
  /** 文章列表数据 */
  const [articleList, setArticleList] = useState<Article[]>([])
  /** 当前页码，默认从第1页开始 */
  const [pageNum, setPageNum] = useState(1)
  /** 是否还有下一页数据 */
  const [hasMore, setHasMore] = useState(false)
  /** 页面首次初始化加载状态（只首次进页面用） */
  const [initLoading, setInitLoading] = useState(false)
  /** 下拉刷新loading状态（仅手动下拉生效） */
  const [refreshLoading, setRefreshLoading] = useState(false)
  /** 上拉加载更多loading状态 */
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  /** 搜索框输入的关键词 */
  const [searchValue, setSearchValue] = useState('')
  /** 列表数据是否为空 */
  const [isEmpty, setIsEmpty] = useState(false)
  /** 搜索栏高度，用于动态计算滚动区域高度 */
  const [searchBarHeight, setSearchBarHeight] = useState(0)
  /** 标记是否首次加载完成 */
  const [firstLoaded, setFirstLoaded] = useState(false)


  // ================== 微信分享配置 ==================
  // 转发给微信好友/群聊 和 分享到微信朋友圈
  usePageShare('晖途博客 · 首页');

  /**
   * 搜索请求防抖处理
   * 输入停止500ms后再发起请求
   */
  const searchRequest = useCallback(
    debounce((keyword: string) => {
      fetchArticleList(true, keyword)
    }, 500),
    []
  )

  /**
   * 获取文章列表数据
   * @param isRefresh 是否为下拉刷新/搜索刷新
   * @param keyword 搜索关键词
   */
  const fetchArticleList = async (isRefresh = false, keyword = '') => {
    // 防止重复请求
    if (initLoading || refreshLoading || isLoadingMore) return

    // ====================== 🔥 核心修复 ======================
    // 首次进入页面 + 列表为空 → 走初始化加载（显示骨架屏）
    if (articleList.length === 0 && !firstLoaded) {
      setInitLoading(true)
    } else if (isRefresh) {
      // 手动下拉刷新 / 搜索刷新
      setRefreshLoading(true)
    } else {
      // 上拉加载更多
      setIsLoadingMore(true)
    }

    try {
      // 刷新重置为第1页，加载更多使用当前页
      const currentPage = isRefresh ? 1 : pageNum
      const params = {
        pageNum: currentPage,
        pageSize: PAGE_SIZE,
        keyword: keyword || undefined,
      }

      // 请求接口获取数据
      const res = await queryHomePageArticleList(params)
      const { records = [], total = 0 } = res.data || {}

      if (isRefresh || !firstLoaded) {
        // 首次加载 / 下拉刷新 / 搜索刷新：替换列表
        setArticleList(records)
        setPageNum(2)
        setIsEmpty(records.length === 0)
        setHasMore(total > 0 && records.length < total)
      } else {
        // 上拉加载：追加列表
        const newList = [...articleList, ...records]
        setArticleList(newList)
        setPageNum(currentPage + 1)
        setHasMore(total > 0 && newList.length < total)
      }
    } catch (err) {
      console.error('获取列表失败：', err)
      setIsEmpty(true)
    } finally {
      // 清空所有加载状态
      setInitLoading(false)
      setRefreshLoading(false)
      setIsLoadingMore(false)
      // 首次加载完成
      setFirstLoaded(true)
    }
  }


  /** 下拉刷新回调 */
  const handleRefresh = () => {
    fetchArticleList(true, searchValue)
  }

  /** 上拉加载更多回调 */
  const onScrollToLower = () => {
    if (hasMore) {
      fetchArticleList(false, searchValue)
    }
  }

  /**
   * 搜索按钮点击事件
   */
  const handleSearch = () => {
    searchRequest(searchValue)
  }

  /**
   * 跳转到文章详情页
   * @param id 文章ID
   */
  const toDetail = (id: number) => {
    navigateTo({ url: `/pages/detail/index?articleId=${id}` })
  }

  /**
   * 计算搜索栏高度：使用Taro官方API获取节点高度
   * 用于动态设置ScrollView可视区域高度，避免写死固定值
   */
  useEffect(() => {
    createSelectorQuery()
      .select('#search-bar')
      .boundingClientRect((res) => {
        if (res) {
          // @ts-ignore
          setSearchBarHeight(res.height)
        }
      })
      .exec()
  }, [])


  /** 页面初始化：默认加载第一页数据 */
  useEffect(() => {
    fetchArticleList(true)
  }, [])

  return (
    <View className="flex-1 bg-gray-50">
      {/* 搜索栏区域：绑定ID用于获取高度 */}
      <View id="search-bar" className="sticky top-0 z-999 bg-white border-b border-gray-200 px-4 py-3">
        <View className="relative flex items-center h-10">
          <Input
            value={searchValue}
            onInput={(e) => {
              const val = e.detail.value
              setSearchValue(val)
            }}
            placeholder="搜索文章..."
            className="flex-1 h-full px-4 pr-10 bg-gray-100 rounded-full text-sm"
          />
          <View
            className="absolute right-0 h-full px-4 flex items-center justify-center"
            onClick={handleSearch}
          >
            <IconFont iconClass="iconfont icon-chaxun" size={18} color="#9ca3af" />
          </View>
        </View>
      </View>

      {/* 滚动列表区域：动态计算高度 */}
      <ScrollView
        scrollY
        enhanced
        showScrollbar={false}
        // 下拉刷新仅绑定手动刷新状态，首次加载不触发下拉刷新动画
        refresherEnabled
        refresherTriggered={firstLoaded && refreshLoading}
        onRefresherRefresh={handleRefresh}
        // 上拉加载配置
        lowerThreshold={LOAD_MORE_THRESHOLD}
        onScrollToLower={onScrollToLower}
        style={{ height: `${windowHeight - searchBarHeight}px` }}
      >
        <View className="px-4 py-3 min-h-full flex flex-col">
          {/* 空数据状态 */}
          {isEmpty ? (
            <View className="flex-1 flex items-center justify-center py-24 text-gray-400">
              <Text className="text-lg">暂无相关内容</Text>
            </View>
          ) : (
            <>
              {/* 首次初始化加载展示骨架屏，不显示下拉刷新 */}
              {initLoading ? (
                <HomeArticleListSkeleton count={PAGE_SIZE} />
              ) : (
                <View className="space-y-3 flex-1">
                  {articleList.map((item) => (
                    <ArticleItem key={item.articleId} article={item} onGoDetail={toDetail} />
                  ))}
                </View>
              )}

              {/* 加载更多组件 */}
              <LoadMore loading={isLoadingMore} hasMore={hasMore} listLength={articleList.length} />
            </>
          )}

          {/* 底部页脚 */}
          <Footer />
        </View>
      </ScrollView>
    </View>
  )
}
