import type { FlexStyle, ViewStyle } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'
import type {
  TMovementDirection,
  TMovementPhase,
  TSlidePosition
} from '../../types'

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

interface ISlideTransitionAnimationAccessibleImageCarouselModelVolatile {
  carouselDimensions?: ReadonlyDeep<TCarouselDimensions> | undefined
  imageData: ReadonlyDeep<TImageData>
  imageDataIndices: Readonly<Record<TSlidePosition, number>>
  isAutoTransitionStarted: boolean
  movementDirection?: TMovementDirection | undefined
  movementPhase?: TMovementPhase | undefined
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
