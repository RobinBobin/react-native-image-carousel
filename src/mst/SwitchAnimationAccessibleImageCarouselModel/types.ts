import type { FlexStyle, ViewStyle } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'
import type {
  TSlidePosition,
  TSwitchDirection,
  TSwitchPhase
} from '../../types'

type TCarouselDimensions = Pick<FlexStyle, 'height' | 'width'>

type TOnPressData = Readonly<{
  imageDataIndex: number
  slidePosition: TSlidePosition
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

interface ISwitchAnimationAccessibleImageCarouselModelVolatile {
  carouselDimensions?: ReadonlyDeep<TCarouselDimensions>
  imageData: ReadonlyDeep<TImageData>
  imageDataIndices: Readonly<Record<TSlidePosition, number>>
  isSwitchingStarted: boolean
  switchDirection?: TSwitchDirection | undefined
  switchPhase?: TSwitchPhase | undefined
}

export type {
  ICommonImageData,
  ISwitchAnimationAccessibleImageCarouselModelVolatile,
  TCarouselDimensions,
  TImageData,
  TImageDatum,
  TImageRawData,
  TImageRawDatum,
  TOnPress,
  TOnPressData
}
