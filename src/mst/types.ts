import type { ImageResolvedAssetSource } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'

type TElementPosition = 'current' | 'next'

interface ICommonImageData {
  onPress?: (index: number) => void
}

type TImageGenericDatum<TIsRaw extends boolean> = ICommonImageData &
  (TIsRaw extends true ? { source: number | string }
  : {
      aspectRatio: number
      source: { uri: string }
    })

type TImageDatum = TImageGenericDatum<false>
type TImageRawDatum = TImageGenericDatum<true>

type TImageData = TImageDatum[]
type TImageRawData = TImageRawDatum[]

interface IImageCarouselModelVolatile {
  aspectRatio: number
  carouselWidth: number
  currentImageIndex: number
  imageData: ReadonlyDeep<TImageData>
  isAutoscrollEnabled: boolean
}

type TSourceData = ICommonImageData &
  Pick<ImageResolvedAssetSource, 'height' | 'uri' | 'width'>

export type {
  IImageCarouselModelVolatile,
  TElementPosition,
  TImageData,
  TImageDatum,
  TImageRawData,
  TImageRawDatum,
  TSourceData
}
