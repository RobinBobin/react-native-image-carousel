import type {
  ImageResolvedAssetSource,
  StyleProp,
  ViewStyle
} from 'react-native'
import type { BaseAnimation } from '../slideTransitionAnimations'
import type { ICommonImageData } from './SlideTransitionAnimationAccessibleImageCarouselModel/types'

type TAspectRatioMode = 'carouselHeight' | 'carouselWidth' | 'square'

interface IImageCarouselModelVolatile {
  aspectRatio: number
  aspectRatioMode: TAspectRatioMode
  // isHorizontal: boolean
  placeholder?: React.ReactNode
  placeholderContainerStyle?: StyleProp<ViewStyle>
  slideTransitionAnimation?: BaseAnimation
}

type TSourceData = ICommonImageData &
  Pick<ImageResolvedAssetSource, 'height' | 'uri' | 'width'>

export type { IImageCarouselModelVolatile, TAspectRatioMode, TSourceData }
