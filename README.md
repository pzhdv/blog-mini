# Blog Mini

> 基于 Taro + React + TailwindCSS 开发的个人博客微信小程序（晖途博客）

![Taro](https://img.shields.io/badge/Taro-4.2.0-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06b6d4)

---

### 项目仓库

- 前端：https://github.com/pzhdv/blog
- 前端 API：https://github.com/pzhdv/blog-api
- 后台管理：https://github.com/pzhdv/blog-admin
- 后台 API：https://github.com/pzhdv/blog-admin-api
- 小程序：https://github.com/pzhdv/blog-mini

## 技术栈

- **跨端框架** - Taro 4.2.0
- **前端框架** - React 18.x
- **开发语言** - TypeScript 5.x
- **CSS 方案** - TailwindCSS (weapp-tailwindcss) 4.x
- **样式预处理器** - Sass 1.x
- **Markdown 渲染** - mp-html
- **图标字体** - iconfont

---

## 功能模块

### 1. 首页 (`/pages/home/index`) 🏠

| 功能 | 说明 |
| :--- | :--- |
| 📄 文章列表 | 分页加载展示文章 |
| 🔍 关键词搜索 | 支持防抖搜索（500ms） |
| 🔄 下拉刷新 | 列表下拉刷新 |
| ⚡ 骨架屏 | 加载状态骨架屏展示 |

### 2. 分类页 (`/pages/category/index`) 📁

| 功能 | 说明 |
| :--- | :--- |
| 🌳 树形导航 | 支持展开/收起的分类树 |
| 🍞 面包屑 | 显示当前分类路径 |
| 📝 文章列表 | 当前分类下的文章 |
| ⬆️ 加载更多 | 上拉加载更多文章 |

### 3. 作者页 (`/pages/author/index`) 👤

| 功能 | 说明 |
| :--- | :--- |
| 🧑‍💻 作者信息 | 头像、职位、简介、年龄、学历 |
| 💼 工作经历 | 工作经历与成就展示 |
| 📧 联系方式 | GitHub、Email、Phone、Website |
| 🎯 博客使命 | 博客宗旨与目标 |

### 4. 详情页 (`/pages/detail/index`) 📖

| 功能 | 说明 |
| :--- | :--- |
| 📜 Markdown 渲染 | 支持富文本内容展示 |
| 📤 微信分享 | 好友分享、朋友圈分享 |
| 📋 代码复制 | 代码块一键复制功能 |
| 🏷️ 文章标签 | 标签展示 |
| 🚀 404 处理 | 文章不存在时友好提示 |

---

## 项目结构

```
blog-mini/
├── src/
│   ├── api/                    # API 接口封装
│   │   └── index.ts            # 接口定义
│   ├── assets/                 # 静态资源
│   │   └── fonts/              # iconfont 图标字体
│   ├── components/             # 公共组件
│   │   ├── Footer.tsx          # 底部版权组件
│   │   ├── IconFont.tsx        # iconfont 图标组件
│   │   ├── ArticleItem.tsx     # 文章列表项组件
│   │   ├── LoadMore.tsx        # 加载更多组件
│   │   ├── Skeleton/           # 骨架屏组件
│   │   └── mp-html/            # Markdown 渲染组件
│   ├── pages/                  # 页面
│   │   ├── home/               # 首页 - 文章列表
│   │   ├── category/           # 分类页 - 树形分类导航
│   │   ├── author/             # 作者页 - 作者信息展示
│   │   └── detail/             # 详情页 - 文章内容
│   ├── types/                  # TypeScript 类型定义
│   │   └── index.ts            # 全局类型
│   ├── utils/                  # 工具函数
│   │   ├── request.ts          # HTTP 请求封装
│   │   ├── performance.ts      # 防抖/节流函数
│   │   ├── categoryPageUtils.ts # 分类页工具函数
│   │   └── asyncUtil.ts        # 异步工具函数
│   ├── app.config.ts           # Taro 全局配置
│   ├── app.ts                  # 根组件
│   └── app.scss                # 全局样式
├── config/                     # 环境配置
│   ├── index.ts                # 通用配置
│   ├── dev.ts                  # 开发环境配置
│   └── prod.ts                 # 生产环境配置
├── .env.development            # 开发环境变量
├── .env.production             # 生产环境变量
├── .env.test                   # 测试环境变量
├── package.json
└── tsconfig.json
```

---

## 环境配置

### 开发环境变量 (`.env.development`)

```bash
# 微信小程序 AppID
TARO_APP_ID="your-app-id"

# API 基础路径
TARO_APP_API="https://your-api-domain.com/blogApi"
```

### 生产环境变量 (`.env.production`)

```bash
TARO_APP_API="https://production-api.com/blogApi"
```

---

## 开发命令

```bash
# 安装依赖
pnpm install

# 微信小程序
npm run dev:weapp      # 开发模式
npm run build:weapp    # 生产构建

# H5
npm run dev:h5          # 开发模式
npm run build:h5       # 生产构建

# 其他平台
npm run dev:swan        # 百度小程序
npm run dev:alipay      # 支付宝小程序
npm run dev:tt          # 字节小程序
npm run dev:rn          # React Native
npm run dev:qq          # QQ 小程序
npm run dev:jd          # 京东小程序
npm run dev:harmony-hybrid # 鸿蒙混合应用
```

---

## 代码规范

| 工具 | 说明 |
| :--- | :--- |
| 🛡️ ESLint | JavaScript/TypeScript 代码检查 |
| 🔷 TypeScript | 静态类型检查 |
| 🪝 Husky + Commitlint | Git 提交信息规范 |
| 🎨 Stylelint | CSS 样式检查 |

---

## 接口说明

本项目依赖后端 API 服务，接口基础路径通过环境变量 `TARO_APP_API` 配置。

### 主要接口

| 接口路径 | 方法 | 说明 |
| :--- | :---: | :--- |
| `/article/mobileHomePageArticleList` | GET | 首页文章列表（分页） |
| `/article/mobileCategoryPageArticleList` | GET | 分类页文章列表（分页） |
| `/article/articleMarkdownById` | GET | 文章详情 |
| `/articleCategory/categoryListWithArticleCount` | GET | 分类列表（含文章数量） |
| `/blogAuthor/currentUserInfo` | GET | 作者信息 |
| `/blogMission/blogMissionInfo` | GET | 博客使命 |
| `/jobExperience/list` | GET | 工作经历列表 |

---

## 注意事项

> ⚠️ **重要提醒**

1. **后端依赖** - 运行本项目需要后端 API 服务支持，请确保 `TARO_APP_API` 配置正确
2. **AppID** - 开发微信小程序需要在 `.env.development` 中配置有效的 `TARO_APP_ID`
3. **mp-html** - 详情页使用 `mp-html` 组件渲染 Markdown 内容
4. **代码复制** - 详情页支持代码块一键复制，采用 Base64 编码协议 `copy://`

---

## 📜 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👨‍💻 作者

- 🧩 **潘宗晖 (PanZonghui)**
- 🌐 **博客**: https://pzhdv.cn
- 📧 **邮箱**: 1939673715@qq.com
- 🐙 **GitHub**: https://github.com/pzhdv

---

## 🙏 致谢

感谢以下开源项目的支持：

- **[Taro](https://github.com/nervjs/taro)** - 多端统一开发框架
- **[React](https://github.com/facebook/react)** - 前端 UI 库
- **[TailwindCSS](https://github.com/tailwindlabs/tailwindcss)** - 原子化 CSS 框架
- **[mp-html](https://github.com/qingwu2016/mp-html)** - 小程序 Markdown 富文本渲染
- **[weapp-tailwindcss](https://github.com/sonofmagic/weapp-tailwindcss)** - 微信小程序 TailwindCSS 兼容方案
- **[TypeScript](https://github.com/microsoft/TypeScript)** - JavaScript 超集，提供类型支持
- **[Husky](https://github.com/typicode/husky)** - Git Hooks 工具
- **[Commitlint](https://github.com/conventional-changelog/commitlint)** - Git 提交信息规范检查


---

如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！
