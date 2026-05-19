import { View, Text } from '@tarojs/components'
import type { FC } from 'react'

/**
 * 字体图标通用组件
 * 适配小程序自动转rpx，统一全局图标样式
 */
interface IconFontProps {
  /** 图标字体类名 */
  iconClass: string
  /** 图标颜色，默认蓝色 */
  color?: string
  /** 图标尺寸，纯数字自动转为rpx */
  size?: number
}

// 全局字体图标封装
const IconFont: FC<IconFontProps> = ({
  iconClass,
  color = '#1677ff',
  size = 28
}) => {
  return (
    <View>
      <Text
        className={iconClass}
        style={{
          color: color,
          fontSize: size
        }}
      />
    </View>
  )
}

export default IconFont
