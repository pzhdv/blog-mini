import { Article, ArticleCategory, BlogAuthor, BlogMission, CategoryPageQueryParams, HomePageQueryParams, JobExperience, PageResult } from "@/types";
import { http } from "@/utils/request";

/**
 * 首页 条件分页查询 文章列表
 * @param params
 * @returns
 */
export const queryHomePageArticleList = (
  params: HomePageQueryParams,
) =>
  http.GET<PageResult<Article>>('/article/mobileHomePageArticleList', params)

/**
* 查询文章详情
* @param articleId
* @returns
*/
export const queryArticleById = (articleId: number) =>
  http.GET<Article>('/article/articleDetailById', { articleId })

// 分类部分
export const queryCategoryListWithArticleCount = (parentId?: number) =>
  http.GET<ArticleCategory[]>(
    '/articleCategory/categoryListWithArticleCount',
    { parentId: parentId },
  )
/**
 * 分类页面 条件分页查询 文章列表
 * @param params
 * @returns
 */
export const queryCategoryPageArticleList = (
  params: CategoryPageQueryParams,
) =>
  http.GET<PageResult<Article>>(
    '/article/mobileCategoryPageArticleList',
    params,
  )


// 博客作者信息
export const queryBlogAuthor = () =>
  http.GET<BlogAuthor>('/blogAuthor/currentUserInfo')

// 博客使命
export const queryBlogMission = () =>
  http.GET<BlogMission>('/blogMission/blogMissionInfo')

// 工作经历
export const queryJobExperienceList = () =>
  http.GET<JobExperience[]>('/jobExperience/list')
