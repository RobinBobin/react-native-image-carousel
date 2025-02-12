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
  imageGap: number
  isHorizontal: boolean
  isSnapEnabled: boolean
  isSlideCentered: boolean
  placeholder?: React.ReactNode
  placeholderContainerStyle?: StyleProp<ViewStyle>
  slideSize: TSlideSize
  slideTransitionAnimation?: BaseAnimation
}

type TSourceData = ICommonImageData &
  Pick<ImageResolvedAssetSource, 'height' | 'uri' | 'width'>

export type { IImageCarouselModelVolatile, TSlideSize, TSourceData }
