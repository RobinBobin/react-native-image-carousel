import type { FlexStyle, ViewStyle } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'
import type { TSlidePosition, TTransitionDirection } from '../../types'

type TCarouselDimensions = Pick<FlexStyle, 'height' | 'width'>
type TCarouselDimensionsKeys = keyof TCarouselDimensions

type TOnPressData = Readonly<{
  imageDataIndex: number
  slidePosition: TSlidePosition | undefined
}>

type TOnPress = (data: TOnPressData) => void

interface ICommonImageData extends Pick<ViewStyle, 'backgroundColor'> {
  onPress?: TOnPress
}

interface IRawImageData {
  source: number | string
}

interface IImageData {
  aspectRatio: number
  source: { uri: string }
}

type TImageDatum = ICommonImageData & IImageData
type TImageRawDatum = ICommonImageData & IRawImageData

type TImageData = TImageDatum[]
type TImageRawData = TImageRawDatum[]

interface ISlideTransitionAnimationAccessibleImageCarouselModelVolatile {
  carouselDimensions?: ReadonlyDeep<TCarouselDimensions> | undefined
  imageData: ReadonlyDeep<TImageData>
  imageDataIndices: Readonly<Record<TSlidePosition, number>>
  isAutoTransitionStarted: boolean
  isTransitionInProgress: boolean
  transitionDirection: TTransitionDirection
}

export type {
  ICommonImageData,
  ISlideTransitionAnimationAccessibleImageCarouselModelVolatile,
  TCarouselDimensions,
  TCarouselDimensionsKeys,
  TImageData,
  TImageDatum,
  TImageRawData,
  TImageRawDatum,
  TOnPress,
  TOnPressData
}
