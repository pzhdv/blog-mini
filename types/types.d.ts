import * as React from 'react'

/**
 * mp-html 完整属性定义
 * 官方文档：https://github.com/jin-yufeng/mp-html
 */
interface MpHtmlProps {
  // 核心内容
  content?: string
  /** 容器样式 */
  'container-style'?: string
  /** 标签默认样式 */
  'tag-style'?: Record<string, string>
  /** 类名 */
  'class-name'?: string
  /** 动画时长 */
  'animation-duration'?: number | string

  // ✅ 必须加：插件配置（解决报错关键）
  plugins?: string | string[]

  // 功能开关
  /** 是否允许长按复制 */
  selectable?: boolean | string
  /** 是否允许图片预览 */
  'preview-img'?: boolean | string
  /** 是否显示动画 */
  'show-with-animation'?: boolean | string
  /** 图片懒加载 */
  'lazy-load'?: boolean | string
  /** 表格横向滚动 */
  'scroll-table'?: boolean | string
  /** 锚点跳转 */
  'use-anchor'?: boolean | string
  /** 解析 markdown */
  markdown?: boolean | string
  /** 实体转义 */
  'use-entities'?: boolean | string
  /** 过滤 script 标签 */
  'filter-script'?: boolean | string
  /** 自动适配屏幕 */
  'auto-break'?: boolean | string
  /** 长按图片菜单 */
  'long-press-menu'?: boolean | string
  /** 图片预览模式 */
  'preview-scale'?: boolean | string

  // 图片/资源
  /** 加载中占位图 */
  'loading-img'?: string
  /** 错误占位图 */
  'error-img'?: string
  /** 图片圆角 */
  'img-border-radius'?: number | string
  /** 图片模式 */
  'img-mode'?: string
  /** 图片质量 */
  'img-quality'?: number | string
  /** 视频自动播放 */
  'video-autoplay'?: boolean | string
  /** 视频循环播放 */
  'video-loop'?: boolean | string
  /** 视频静音 */
  'video-muted'?: boolean | string

  // 锚点/滚动
  /** 锚点偏移量 */
  'anchor-top'?: number | string
  /** 滚动动画 */
  'scroll-animation'?: boolean | string

  // 代码高亮
  /** 代码高亮 */
  highlight?: boolean | string
  /** 代码行号 */
  'show-line-number'?: boolean | string
  /** 显示语言 */
  'show-language'?: boolean | string
  /** 代码主题 */
  'code-theme'?: string

  // 事件回调（完整官方事件）
  /** 渲染完成 */
  onReady?: (event: { detail: { height: number } }) => void
  /** 点击图片 */
  onImgtap?: (event: { detail: { src: string; ignore: () => void } }) => void
  /** 点击链接 */
  onLinktap?: (event: { detail: { href: string; ignore: () => void } }) => void
  /** 渲染错误 */
  onError?: (event: { detail: { source: string; target: HTMLElement } }) => void
  /** 图片加载完成 */
  onImgload?: (event: { detail: { src: string; success: boolean } }) => void
  /** 锚点跳转 */
  onAnchor?: (event: { detail: { id: string } }) => void
  /** 复制内容 */
  onCopy?: (event: { detail: { content: string } }) => void
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * 微信小程序富文本组件 mp-html
       */
      'mp-html': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & MpHtmlProps,
        HTMLElement
      >
    }
  }
}

export { }
