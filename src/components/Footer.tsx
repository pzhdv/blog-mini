import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import BeiAn from '@/assets/images/beian.png'

export default function Footer() {
  // 个人小程序专用：复制链接 + 提示浏览器打开
  const openLinkSafe = (url: string, title: string) => {
    Taro.setClipboardData({
      data: url,
      success: () => {
        Taro.showToast({
          title: `已复制${title}链接，请在浏览器打开`,
          icon: 'none',
          duration: 2000,
        })
      },
    })
  }

  return (
    <View className="py-8 text-gray-600 bg-gray-100">
      <View className="px-4 text-center">
        <View className="flex justify-center space-x-6 mb-4">
          <Text
            onClick={() => openLinkSafe('https://github.com/pzhdv', 'GitHub')}
            className="text-gray-600"
          >
            GitHub
          </Text>
          <Text
            onClick={() => openLinkSafe('https://juejin.cn/user/1363841737818167/posts', '掘金')}
            className="text-gray-600"
          >
            掘金
          </Text>
          <Text
            onClick={() => openLinkSafe('https://blog.csdn.net/pzhdv', 'CSDN')}
            className="text-gray-600"
          >
            CSDN
          </Text>
        </View>

        <Text className="text-base mb-2">© 2025 技术博客. 保留所有权利</Text>

        <View className="mt-1 flex flex-col items-center justify-center gap-x-3 gap-y-1 text-sm">
          <Text
            onClick={() => openLinkSafe('https://beian.miit.gov.cn/', '工信部备案')}
            className="text-gray-600"
          >
            黔ICP备2025050132号
          </Text>
          <View
            onClick={() => openLinkSafe('https://beian.mps.gov.cn/', '公安部备案')}
            className="flex items-center gap-1"
          >
            <Image src={BeiAn} className="w-4 h-4 object-contain" mode="aspectFit" />
            <Text className="text-gray-600">贵公网安备52040202010008号</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
