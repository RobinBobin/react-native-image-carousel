import type {
  ImageResolvedAssetSource,
  StyleProp,
  ViewStyle
} from 'react-native'
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
  isRedrawForced: boolean
  isSlideCentered: boolean
  isSnapEnabled: boolean
  placeholder?: React.ReactNode
  placeholderContainerStyle?: StyleProp<ViewStyle>
  slideSize: TSlideSize
  style?: StyleProp<ViewStyle>
}

type TSourceData = ICommonImageData &
  Pick<ImageResolvedAssetSource, 'height' | 'uri' | 'width'>

export type { IImageCarouselModelVolatile, TSlideSize, TSourceData }
