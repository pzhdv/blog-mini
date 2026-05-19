import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='p-4 bg-blue-100'>
      <Text className='text-lg font-bold text-blue-600'>
        Tailwind CSS 小程序测试成功 ✅
      </Text>
    </View>
  )
}
