// ======================
// 1. 文章相关
// ======================
export interface Article {
  articleId: number // 文章id
  title: string // 标题
  markdown: string // 内容
  image: string // 图片
  tagIds: number[] // 标签ids
  categoryIds: number[] // 分类ids
  excerpt: string // 摘要
  createTime: string // 更新时间
  articleTagList?: ArticleTag[] // 文章所属标签列表
  articleCategoryList?: ArticleCategory[] // 文章所属分类
}

// ======================
// 2. 分类相关
// ======================
export interface ArticleCategory {
  categoryId: number // 分类id
  iconClass: string // 分类图标
  categoryName: string // 分类名称
  parentId: number // 父id
  articleTotal: number // 分类下的文章总数
  children?: ArticleCategory[] // 子列表
}

// ======================
// 3. 标签相关
// ======================
export interface ArticleTag {
  articleTagId: number // 标签id
  articleTagName: string // 标签内容
}

// ======================
// 4. 博主信息相关
// ======================
export interface BlogAuthor {
  userId: number // 用户id
  fullName: string // 用户名
  avatar: string // 用户头像
  position: string // 用户职位
  selfIntroduction: string // 个人简介
  email: string // 个人邮箱
  website: string // 个人网址
  github: string // 个人 github
  phone: string // 个人电话
  userNick: string // 用户昵称
  birthday: string // 生日
  educationLevel: string // 学历
  schoolName: string // 学校名称
}

// 联系方式
export interface ContactMethodType {
  name: string
  value: string
  iconClass: string
  url?: string
}

// ======================
// 5. 博客使命相关
// ======================
export type MissionPoint = { missionPoint: string }

export interface BlogMission {
  missionId: number // 博客使命id
  missionTitle: string // 使命标题
  missionDescription: string // 使命描述
  missionPointListStr: string // 具体使命要点
  missionPointList?: MissionPoint[] // 前端扩展字段
}

// ======================
// 6. 经历与成就相关
// ======================
export type Achievement = { achievement: string }

export interface JobExperience {
  id: number // id
  title: string // 经历或成就的标题
  titleIcon: string // 标题图标类
  organization: string // 所属组织
  timeRange: string // 时间范围
  achievementListStr: string // 成就字符串
  achievementList?: Achievement[] // 前端扩展字段
}

// ======================
// 7. 分页通用
// ======================
export interface PageResult<T> {
  total: number // 总条数
  size: number // 页大小
  current: number // 当前页码
  pages: number // 总页数
  records: T[] // 数据列表
}

// ======================
// 8. 请求参数相关
// ======================
export interface HomePageQueryParams {
  publishDateStr?: string // 发布日期
  articleTagId?: number // 标签ID
  pageNum: number // 当前页码
  pageSize: number // 页大小
  keyword?: string// 关键字
}

export interface CategoryPageQueryParams {
  categoryIds?: number[] // 分类Id列表
  pageNum: number // 当前页码
  pageSize: number // 页大小
}
