import type { FlexStyle, ImageResolvedAssetSource } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'
import type { ICommonImageData } from './imageData'

type TCarouselDimensions = Pick<FlexStyle, 'height' | 'width'>
type TCarouselDimensionKey = keyof TCarouselDimensions

type TNumericCarouselDimensions = Required<
  Record<TCarouselDimensionKey, number>
>

type TRCarouselDimensions<TCanBeUndefined extends boolean = true> =
  | ReadonlyDeep<TCarouselDimensions>
  | (TCanBeUndefined extends true ? undefined : never)

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
