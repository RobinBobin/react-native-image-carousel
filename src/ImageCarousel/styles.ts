import type { ImageStyle, StyleProp, ViewStyle } from 'react-native'

const getImageContainerStyle = (aspectRatio: number): StyleProp<ViewStyle> => ({
  aspectRatio,
  overflow: 'hidden'
})

const getImageStyle = (aspectRatio: number): StyleProp<ImageStyle> => ({
  aspectRatio,
  position: 'absolute',
  width: '100%'
})

export { getImageContainerStyle, getImageStyle }
