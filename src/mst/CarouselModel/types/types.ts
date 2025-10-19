import type { FlexStyle, ImageResolvedAssetSource } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'
import type { ICommonImageData } from './imageData'

type TCarouselDimensions = Pick<FlexStyle, 'height' | 'width'>

type TNumericCarouselDimensions = Required<{
  [K in keyof TCarouselDimensions]: number
}>

type TRCarouselDimensions<TCanBeUndefined extends boolean = true> =
  | ReadonlyDeep<TCarouselDimensions>
  | (TCanBeUndefined extends true ? undefined : never)

type TCarouselDimensionKey = keyof TCarouselDimensions

type TSlideSize =
  | 'carouselHeightSquare'
  | 'carouselWidthSquare'
  | 'image'
  | 'wholeCarousel'

type TSourceData = ICommonImageData &
  Pick<ImageResolvedAssetSource, 'height' | 'uri' | 'width'>

export type {
  TCarouselDimensionKey,
  TCarouselDimensions,
  TNumericCarouselDimensions,
  TRCarouselDimensions,
  TSlideSize,
  TSourceData
}
