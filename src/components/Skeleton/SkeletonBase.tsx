import { View } from '@tarojs/components'

const SkeletonBase = ({
  className = '',
  width,
  height,
}: {
  className?: string
  width?: string | number
  height?: string | number
}) => {
  return (
    <View
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{
        width: width,
        height: height,
      }}
    />
  )
}

export default SkeletonBase
