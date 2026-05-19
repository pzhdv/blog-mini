import { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";

import type { Article } from "@/types";
import { queryArticleById } from "@/api";
import { isNumeric } from "@/utils/common";

import { ArticleDetailSkeleton } from "@/components/Skeleton";
import IconFont from "@/components/IconFont";
import Footer from "@/components/Footer";
import { usePageShare } from "@/hooks/usePageShare";

/**
 * 文章详情页 - 富文本样式配置
 * 解决 mp-html 组件样式隔离问题，直接注入到渲染后的 HTML 标签中生效
 */
const TAG_STYLE = {
  // 引用块样式
  blockquote: "margin: 32rpx 0; padding: 24rpx 32rpx; background-color: #f1f5f9; border-left: 8rpx solid #3b82f9; color: #475569; border-radius: 0 12rpx 12rpx 0;",
  // 行内代码样式
  code: "color:#ff6900;background-color: #fff;",
  // 代码块样式
  pre: "background-color:#fff;",
  // 表格样式
  th: "white-space: nowrap;background-color: #f6f8fa;",
  td: "white-space: nowrap;",
  // 分割线样式
  hr: "display: block; height: 0; border: none; border-top: 2rpx solid #e2e8f0; margin: 64rpx 0; clear: both;",
  // 列表样式
  ul: "padding-left: 40rpx; margin: 24rpx 0; color: #37474f;",
  ol: "padding-left: 40rpx; margin: 24rpx 0; color: #37474f;",
  // 标题样式 H1-H6
  h1: "font-size: 1.8em; font-weight: bold; margin: 48rpx 0 24rpx; color: #1a202c; line-height: 1.3;",
  h2: "font-size: 1.5em; font-weight: bold; margin: 40rpx 0 20rpx; color: #1a202c; line-height: 1.3;",
  h3: "font-size: 1.3em; font-weight: bold; margin: 36rpx 0 16rpx; color: #1a202c; line-height: 1.3;",
  h4: "font-size: 1.15em; font-weight: bold; margin: 32rpx 0 16rpx; color: #1a202c; line-height: 1.3;",
  h5: "font-size: 1.0em; font-weight: bold; margin: 28rpx 0 14rpx; color: #1a202c; line-height: 1.3;",
  h6: "font-size: 0.9em; font-weight: bold; margin: 24rpx 0 12rpx; color: #475569; line-height: 1.3;",
  // 链接样式
  a: "word-break: break-all; overflow-wrap: break-word; color: #2563eb; text-decoration: underline;",
  // 段落样式
  p: "word-break: break-all; overflow-wrap: break-word; margin-bottom: 24rpx; color: #37474f; line-height: 1.8;",
};

/**
 * 文章详情页面
 * 功能：展示单篇文章完整内容、支持分享好友/朋友圈、处理异常状态
 */
export default function BlogDetail() {
  // ================== 状态定义 ==================
  /** 文章ID：从页面参数中获取 */
  const [articleId, setArticleId] = useState<string | undefined>(undefined);
  /** 文章详情数据 */
  const [article, setArticle] = useState<Article | undefined>();
  /** 页面加载状态：用于控制骨架屏显示 */
  const [loading, setLoading] = useState(true);

  // ================== 微信分享配置 ==================
  // 转发给微信好友/群聊 和 分享到微信朋友圈
  usePageShare(article?.title || '晖途博客 · 博客详情', article?.image);


  // ================== 页面生命周期 ==================
  /**
   * 页面加载生命周期
   * 获取页面跳转携带的参数（articleId），冷启动/分享打开必执行
   */
  useLoad((options) => {
    if (options?.articleId) {
      setArticleId(String(options.articleId));
    }
  });

  // 页面显示时兜底（热启动/从后台返回/分享后打开）
  useDidShow(() => {
    const params = Taro.getCurrentInstance()?.router?.params || {};
    if (params.articleId) {
      setArticleId(String(params.articleId));
    }
  });

  /**
   * 监听文章ID变化，自动加载文章详情
   * 依赖：articleId 改变时重新请求
   */
  useEffect(() => {
    // 无文章ID时，直接结束加载状态
    if (!articleId) {
      setLoading(false);
      return;
    }

    /**
     * 请求文章详情接口
     */
    const getArticleById = async () => {
      try {
        setLoading(true);
        // 请求文章详情数据
        const res = await queryArticleById(Number(articleId));
        const data = res?.data || null;
        setArticle(data);

        // 设置页面导航栏标题
        if (data?.title) {
          Taro.setNavigationBarTitle({ title: data.title });
        }
      } catch (error) {
        console.error("文章加载失败:", error);
        setArticle(undefined);
      } finally {
        // 无论成功/失败，关闭加载状态
        setLoading(false);
      }
    };

    // 校验ID合法性，合法才请求
    if (isNumeric(articleId)) {
      getArticleById();
      Taro.pageScrollTo({ scrollTop: 0 });
    } else {
      setLoading(false);
    }
  }, [articleId]);

  // ================== 页面渲染 ==================
  // 1. 加载中：显示骨架屏
  if (loading) {
    return <ArticleDetailSkeleton />;
  }

  // 2. 无数据/异常/文章不存在：显示404页面
  if (!article) {
    return (
      <View className="min-h-screen bg-white flex flex-col">
        <View className="flex-1 flex flex-col items-center justify-center p-10">
          <Text className="text-6xl mb-4">🚀</Text>
          <Text className="text-gray-900 text-xl font-bold mb-2">文章不见了</Text>
          <Text className="text-gray-400 text-sm mb-8 text-center">
            文章可能已被删除、隐藏或链接已过期
          </Text>
          <View
            className="px-8 py-2 bg-blue-500 text-white rounded-full text-sm active:opacity-80"
            onClick={() => Taro.reLaunch({ url: "/pages/index/index" })}
          >
            返回首页
          </View>
        </View>
        <Footer />
      </View>
    );
  }

  // 3. 正常：渲染文章详情
  return (
    <View className="min-h-screen bg-white flex flex-col safe-area-bottom">
      {/* 文章内容区域 */}
      <View className="flex-1 w-full p-4 box-border">
        {/* 文章头部：标题 + 发布时间 + 标签 */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900 leading-tight mb-4 block">
            {article.title}
          </Text>
          <View className="text-gray-400 text-xs mb-4 flex items-center gap-1">
            <IconFont iconClass="iconfont icon-riqi" size={20} color="#9ca3af" />
            <Text>{article.createTime?.split(" ")[0]}</Text>
          </View>

          {/* 文章标签列表 */}
          <View className="flex flex-wrap gap-2">
            {article.articleTagList?.map((tag) => (
              <Text
                key={tag.articleTagId}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
              >
                {tag.articleTagName}
              </Text>
            ))}
          </View>
        </View>

        {/* Markdown 富文本渲染 */}
        <mp-html
          content={article.markdown}
          markdown={true}
          highlight={true}
          preview-img={true}
          selectable={true}
          scroll-table={true}
          tag-style={TAG_STYLE}
        />
      </View>

      {/* 页面底部公共组件 */}
      <Footer />
    </View>
  );
}
