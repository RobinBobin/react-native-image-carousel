import type { ImageResolvedAssetSource } from 'react-native'
import type { BaseAnimation } from '../switchAnimations'
import type { ICommonImageData } from './SwitchAnimationAccessibleImageCarouselModel/types'

interface IImageCarouselModelVolatile {
  aspectRatio: number
  switchAnimation?: BaseAnimation
}

type TSourceData = ICommonImageData &
  Pick<ImageResolvedAssetSource, 'height' | 'uri' | 'width'>

export type { IImageCarouselModelVolatile, TSourceData }
