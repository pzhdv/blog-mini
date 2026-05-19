import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import {
  queryBlogAuthor,
  queryBlogMission,
  queryJobExperienceList,
} from '@/api'
import type {
  BlogAuthor,
  BlogMission,
  ContactMethodType,
  JobExperience,
} from '@/types'
import { calculateAge } from '@/utils/common'
import { usePageShare } from '@/hooks/usePageShare'

import Footer from '@/components/Footer'
import IconFont from '@/components/IconFont'
import {
  AuthorInfoSkeleton,
  JobExperienceSkeleton,
  ContactMethodSkeleton,
  BlogMissionSkeleton,
} from '@/components/Skeleton'


export default function BlogAuthorInfo() {
  // 作者信息
  const [blogAuthor, setBlogAuthor] = useState<BlogAuthor | null>(null)
  // 联系方式列表
  const [contactMethodList, setContactMethodList] = useState<ContactMethodType[]>([])
  // 博客使命
  const [blogMission, setBlogMission] = useState<BlogMission | null>(null)
  // 工作/经历列表
  const [jobExperienceList, setJobExperienceList] = useState<JobExperience[]>([])


  /**
   * 处理作者信息：组装联系方式展示数据
   */
  const processBlogAuthorData = (data: BlogAuthor) => {
    setBlogAuthor(data)
    setContactMethodList([
      { name: 'GitHub', value: data.github, iconClass: 'iconfont icon-github' },
      { name: 'Email', value: data.email, iconClass: 'iconfont icon-email' },
      { name: 'Phone', value: data.phone, iconClass: 'iconfont icon-phone' },
      { name: 'Website', value: data.website, iconClass: 'iconfont icon-website' },
    ])
  }

  /**
   * 处理博客使命：将 & 分隔的字符串转为数组
   */
  const processBlogMissionData = (data: BlogMission) => {
    const missionPointList = data.missionPointListStr
      ? data.missionPointListStr.split('&').filter(Boolean).map(i => ({ missionPoint: i }))
      : []
    setBlogMission({ ...data, missionPointList })
  }

  /**
   * 处理工作经历：将成就字符串转为数组
   */
  const processJobExperienceData = (data: JobExperience[]) => {
    const list = data.map(exp => ({
      ...exp,
      achievementList: exp.achievementListStr
        ? exp.achievementListStr.split('&').map(i => ({ achievement: i }))
        : [],
    }))
    setJobExperienceList(list)
  }


  // ================== 微信分享配置 ==================
  // 转发给微信好友/群聊 和 分享到微信朋友圈
  usePageShare('晖途博客 · 潘潘主页')

  // 页面初始化：只请求一次数据
  useEffect(() => {
    // 统一获取所有页面数据
    const fetchAllData = async () => {
      try {
        // 并行请求 3 个接口
        const [authorRes, missionRes, jobRes] = await Promise.all([
          queryBlogAuthor(),
          queryBlogMission(),
          queryJobExperienceList(),
        ])
        // 分别处理数据
        processBlogAuthorData(authorRes.data)
        processBlogMissionData(missionRes.data)
        processJobExperienceData(jobRes.data)
      } catch (err) {
        console.error('请求失败', err)
      }
    }
    fetchAllData()
  }, [])

  return (
    <View className="w-screen h-screen overflow-hidden bg-gray-50">

      {/* 核心：只有这里能滚动，且禁止下拉回弹 */}
      <ScrollView
        scrollY
        className="w-full h-full"
        bounces={false}
        showScrollbar={false}
        enhanced
      >

        {/* 页面内容容器 */}
        <View className="space-y-8 my-8 flex-1 px-8">

          {/* ====================== 1. 作者信息卡片 ====================== */}
          {!blogAuthor ? (
            <AuthorInfoSkeleton />
          ) : (
            <View className="flex flex-col gap-3 p-6 rounded-2xl bg-white shadow-lg">
              <View className="flex justify-center">
                <Image
                  src={blogAuthor.avatar}
                  mode="aspectFill"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                />
              </View>
              <View className="flex justify-center my-2">
                <Text className="text-2xl font-bold">{blogAuthor.fullName}</Text>
              </View>
              <View className="flex justify-between items-center">
                <View className="flex items-center">
                  <IconFont iconClass="iconfont icon-nianling" color="#2b7fff" size={16} />
                  <Text className="ml-1 text-sm text-gray-600">{calculateAge(blogAuthor.birthday)}</Text>
                </View>
                <View className="flex items-center">
                  <IconFont iconClass="iconfont icon-xueli" color="#2b7fff" size={16} />
                  <Text className="ml-1 text-sm text-gray-600">{blogAuthor.educationLevel}</Text>
                </View>
                <View className="flex items-center">
                  <IconFont iconClass="iconfont icon-xuexiao" color="#2b7fff" size={16} />
                  <Text className="ml-1 text-sm text-gray-600">{blogAuthor.schoolName}</Text>
                </View>
              </View>
              <View className="flex items-center">
                <IconFont iconClass="iconfont icon-user" color="#2b7fff" size={24} />
                <Text className="ml-2 text-gray-600">{blogAuthor.position}</Text>
              </View>
              <View>
                <Text className="text-gray-600 text-sm leading-relaxed">{blogAuthor.selfIntroduction}</Text>
              </View>
            </View>
          )}

          {/* ====================== 2. 经历与成就 ====================== */}
          {!jobExperienceList.length ? (
            <JobExperienceSkeleton />
          ) : (
            <View className="p-8 rounded-2xl bg-white shadow-lg">
              <View className="mb-6">
                <Text className="text-2xl font-bold">🚀 经历与成就</Text>
              </View>
              <View className="space-y-6">
                {jobExperienceList.map(item => (
                  <View key={item.id} className="border-l-4 border-blue-500 pl-4">
                    <View className="flex items-center">
                      <IconFont iconClass={item.titleIcon} color="#3B82F6" size={24} />
                      <Text className="ml-2 text-lg font-semibold">{item.title}</Text>
                    </View>
                    <View className="pl-8 my-1">
                      <Text className="text-sm text-gray-600">{item.organization} · {item.timeRange}</Text>
                    </View>
                    <View className="pl-8 space-y-2">
                      {item.achievementList?.map((ach, index) => (
                        <View key={index}>
                          <Text className="text-sm text-gray-600">• {ach.achievement}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ====================== 3. 联络方式 ====================== */}
          {!contactMethodList.length ? (
            <ContactMethodSkeleton />
          ) : (
            <View className="p-6 rounded-2xl bg-white shadow-lg">
              <View className="mb-4">
                <Text className="text-xl font-semibold">联络方式</Text>
              </View>
              <View className="space-y-1">
                {contactMethodList.map(method => (
                  <View key={method.name} className="flex items-center p-1 rounded-lg">
                    <View className="mr-3">
                      <IconFont iconClass={method.iconClass} color="#2b7fff" size={24} />
                    </View>
                    <View>
                      <Text className="text-sm font-medium">{method.name}</Text>
                      <View className="mt-1">
                        <Text className="text-sm text-gray-600">{method.value}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ====================== 4. 博客使命 ====================== */}
          {!blogMission ? (
            <BlogMissionSkeleton />
          ) : (
            <View className="p-8 rounded-2xl bg-white shadow-lg">
              <View className="mb-4">
                <Text className="text-2xl font-bold">{blogMission.missionTitle}</Text>
              </View>
              <View>
                <Text className="text-gray-600 leading-relaxed">{blogMission.missionDescription}</Text>
              </View>
              <View className="pl-2 mt-2 space-y-2">
                {blogMission.missionPointList?.map((item, index) => (
                  <View key={index}>
                    <Text className="text-gray-600">• {item.missionPoint}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <Footer />
      </ScrollView>
    </View>
  )
}
