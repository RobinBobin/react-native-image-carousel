import type { FlexStyle, ViewStyle } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'
import type { TSlidesTransitionAnimation } from '../../slideTransitionAnimations'
import type { TSlidePosition, TTransitionDirection } from '../../types'

type TCarouselDimensions = Pick<FlexStyle, 'height' | 'width'>
type TCarouselDimensionsKeys = keyof TCarouselDimensions

type TSlideDatum = Readonly<[TSlidePosition, number]>
type TSlideId = 'slide1' | 'slide2' | 'slide3'

type TOnPressData = Readonly<{
  imageDataIndex: number
  slidePosition: TSlidePosition | undefined
}>

type TOnPress = (data: TOnPressData) => void

interface ICommonImageData extends Pick<ViewStyle, 'backgroundColor'> {
  onPress?: TOnPress
  overlay?: React.ReactNode
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
  isAutoTransitionStarted: boolean
  isTransitionInProgress: boolean
  slideData: Readonly<Record<TSlideId, TSlideDatum>>
  slidesTransitionAnimation: TSlidesTransitionAnimation
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
  TOnPressData,
  TSlideDatum,
  TSlideId
}
