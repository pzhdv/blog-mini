import type { ArticleCategory } from '@/types'

/**
 * 模拟异步延迟
 * @param ms 延迟毫秒数
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 校验值是否为合法的正整数（文章ID专用）
 */
export const isNumeric = (value: string | number | undefined | null): boolean => {
  if (value === undefined || value === null) return false

  if (typeof value === 'number') {
    return !isNaN(value) && Number.isFinite(value) && value > 0
  }

  if (typeof value === 'string') {
    const trimVal = value.trim()
    return /^[1-9]\d*$/.test(trimVal)
  }

  return false
}




/**
  * 根据生日计算年龄
  * @param birthDate 生日字符串
  */
export const calculateAge = (birthDate: string | undefined) => {
  if (!birthDate) return 0
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}


/**
 * 树形分类 → 扁平数组
 * 用于快速查找、生成面包屑
 */
export const treeDataToListData = (
  treeData: ArticleCategory[],
): ArticleCategory[] => {
  const listData: ArticleCategory[] = []

  const traverse = (categories: ArticleCategory[]) => {
    categories.forEach(category => {
      const { children, ...item } = category
      listData.push(item)

      if (children?.length) {
        traverse(children)
      }
    })
  }

  traverse(treeData)
  return listData
}

/**
 * 收集当前分类 + 所有子分类 ID
 * 用于查询该分类下所有文章（包含子分类）
 */
export const collectCategoryIds = (category: ArticleCategory): number[] => {
  const ids: number[] = [category.categoryId]

  const traverse = (children?: ArticleCategory[]) => {
    if (!children || children.length === 0) return

    children.forEach(item => {
      ids.push(item.categoryId)
      traverse(item.children)
    })
  }

  traverse(category.children)
  return ids
}


/**
 * 递归获取分类完整面包屑路径
 * @param category 当前分类
 * @param categoryList 全部分类列表
 * @returns 面包屑名称数组 [父级, 祖父级, ..., 当前]
 */
export function getCategoryPath(
  category: ArticleCategory,
  categoryList: ArticleCategory[]
): string[] {
  const path: string[] = [category.categoryName]

  const findParent = (parentId: number) => {
    const parent = categoryList.find(item => item.categoryId === parentId)
    if (parent) {
      path.unshift(parent.categoryName)
      findParent(parent.parentId)
    }
  }

  if (category.parentId) findParent(category.parentId)
  return path
}
