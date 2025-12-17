import type { StyleProp, ViewStyle } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'
import type { TSlideGroupTransitionAnimation } from '../../../slideTransitionAnimations'
import type { TImageData } from './imageData'
import type { TImageVolatileData } from './imageVolatileData'
import type { TSlideSize } from './types'

interface ICarouselModelVolatile {
  aspectRatio: number
  imageData: ReadonlyDeep<TImageData>
  imageGap: number
  imageVolatileData: TImageVolatileData
  isAutoTransitionStartRequested: boolean
  isSlideCentered: boolean
  isSnapEnabled: boolean
  isTransitionRequested: boolean
  placeholder?: React.ReactNode
  placeholderContainerStyle?: StyleProp<ViewStyle>
  slideGroupTransitionAnimation: TSlideGroupTransitionAnimation
  slideSize: TSlideSize
  style?: StyleProp<ViewStyle>
}

export type { ICarouselModelVolatile }
