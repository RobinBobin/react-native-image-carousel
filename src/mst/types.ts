import type { IDisposer } from 'mobx-state-tree'
import type {
  ImageResolvedAssetSource,
  StyleProp,
  ViewStyle
} from 'react-native'
import type { BaseAnimation } from '../slideTransitionAnimations'
import type { ICommonImageData } from './SlideTransitionAnimationAccessibleImageCarouselModel/types'

type TSlideSize =
  | 'carouselHeightSquare'
  | 'carouselWidthSquare'
  | 'image'
  | 'wholeCarousel'

interface IImageCarouselModelVolatile {
  aspectRatio: number
  disposers: IDisposer[]
  imageGap: number
  isAutoTransitionStarted: boolean
  isHorizontal: boolean
  isSlideCentered: boolean
  isSnapEnabled: boolean
  placeholder?: React.ReactNode
  placeholderContainerStyle?: StyleProp<ViewStyle>
  slideSize: TSlideSize
  slideTransitionAnimation: BaseAnimation
  style?: StyleProp<ViewStyle>
}

type TSourceData = ICommonImageData &
  Pick<ImageResolvedAssetSource, 'height' | 'uri' | 'width'>

export type { IImageCarouselModelVolatile, TSlideSize, TSourceData }
