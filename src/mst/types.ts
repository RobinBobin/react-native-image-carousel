import type {
  ImageResolvedAssetSource,
  StyleProp,
  ViewStyle
} from 'react-native'
import type { BaseAnimation } from '../slideTransitionAnimations'
import type { ICommonImageData } from './SlideTransitionAnimationAccessibleImageCarouselModel/types'

interface IImageCarouselModelVolatile {
  aspectRatio: number
  placeholder?: React.ReactNode
  placeholderContainerStyle?: StyleProp<ViewStyle>
  slideTransitionAnimation?: BaseAnimation
}

type TSourceData = ICommonImageData &
  Pick<ImageResolvedAssetSource, 'height' | 'uri' | 'width'>

export type { IImageCarouselModelVolatile, TSourceData }
