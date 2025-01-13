import type { ImageResolvedAssetSource } from 'react-native'
import type { ISwitchAnimation } from '../switchAnimations/types'
import type { ICommonImageData } from './SwitchAnimationAccessibleImageCarouselModel/types'

interface IImageCarouselModelVolatile {
  aspectRatio: number
  isAutoSwitchEnabled: boolean
  switchAnimation?: ISwitchAnimation
}

type TSourceData = ICommonImageData &
  Pick<ImageResolvedAssetSource, 'height' | 'uri' | 'width'>

export type { IImageCarouselModelVolatile, TSourceData }
