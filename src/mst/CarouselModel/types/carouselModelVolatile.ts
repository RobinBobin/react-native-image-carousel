import type { StyleProp, ViewStyle } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'
import type { TSlideGroupTransitionAnimation } from '../../../slideTransitionAnimations'
import type { TSlideData, TTransitionDirection } from '../../types'
import type { TImageData } from './imageData'
import type { TRCarouselDimensions, TSlideSize } from './types'

interface ICarouselModelVolatileBase {
  isTransitionInProgress: boolean
}

type TRCarouselModelVolatileBase = Readonly<ICarouselModelVolatileBase>

interface ICarouselModelVolatile {
  aspectRatio: number
  carouselDimensions?: TRCarouselDimensions
  imageData: ReadonlyDeep<TImageData>
  imageGap: number
  isAutoTransitionStarted: boolean
  isSlideCentered: boolean
  isSnapEnabled: boolean
  placeholder?: React.ReactNode
  placeholderContainerStyle?: StyleProp<ViewStyle>
  slideData: TSlideData
  slideGroupTransitionAnimation: TSlideGroupTransitionAnimation
  slideSize: TSlideSize
  style?: StyleProp<ViewStyle>
  transitionDirection: TTransitionDirection
}

export type {
  ICarouselModelVolatile,
  ICarouselModelVolatileBase,
  TRCarouselModelVolatileBase
}
