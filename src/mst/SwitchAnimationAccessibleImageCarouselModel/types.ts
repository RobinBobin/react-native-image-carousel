import type { FlexStyle } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'

type TCarouselDimensions = Pick<FlexStyle, 'height' | 'width'>

interface ICarouselNumberDimensions {
  height: number
  width: number
}

type TSwitchDirection = 'next' | 'previous'
type TSlidePosition = 'current' | TSwitchDirection

type TOnPressData = Readonly<{
  index: number
  slidePosition: TSlidePosition
}>

type TOnPress = (data: TOnPressData) => void

interface ICommonImageData {
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

interface ISwitchAnimationAccessibleImageCarouselModelVolatile {
  carouselDimensions?: ReadonlyDeep<TCarouselDimensions>
  currentImageIndex: number
  imageData: ReadonlyDeep<TImageData>
  isSwitchingStarted: boolean
  switchDirection?: TSwitchDirection | undefined
}

export type {
  ICarouselNumberDimensions,
  ICommonImageData,
  ISwitchAnimationAccessibleImageCarouselModelVolatile,
  TCarouselDimensions,
  TImageData,
  TImageDatum,
  TImageRawData,
  TImageRawDatum,
  TOnPress,
  TOnPressData,
  TSlidePosition,
  TSwitchDirection
}
