import type { StyleProp } from 'react-native'
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated'
import type { TSlidePosition } from '../../../mst/SwitchAnimationAccessibleImageCarouselModel/types'

type TAxis = 'x' | 'y'

type TSlideDatum = Partial<{
  translate: SharedValue<number>
  animatedStyle: Exclude<StyleProp<AnimatedStyle>, undefined>
}>

type TSlideData = Record<TSlidePosition, TSlideDatum>

type TSlideDataRecord = Partial<Record<TAxis, TSlideData>>

type TSwitchValue = Readonly<[TSlidePosition, number]>
type TSwitchValues = readonly [TSwitchValue, TSwitchValue, TSwitchValue]

export type {
  TAxis,
  TSlideData,
  TSlideDataRecord,
  TSlideDatum,
  TSwitchValue,
  TSwitchValues
}
