import type {
  ImageResolvedAssetSource,
  StyleProp,
  ViewStyle
} from 'react-native'
import type { BaseAnimation } from '../switchAnimations'
import type { ICommonImageData } from './SwitchAnimationAccessibleImageCarouselModel/types'

interface IImageCarouselModelVolatile {
  aspectRatio: number
  placeholder?: React.ReactNode
  placeholderContainerStyle?: StyleProp<ViewStyle>
  switchAnimation?: BaseAnimation
}

type TSourceData = ICommonImageData &
  Pick<ImageResolvedAssetSource, 'height' | 'uri' | 'width'>

export type { IImageCarouselModelVolatile, TSourceData }
