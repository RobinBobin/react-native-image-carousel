import type { StyleProp } from 'react-native'
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated'
import type { Entry } from 'type-fest'
import type { TSlidePosition } from '../../../types'

type TAxis = 'x' | 'y'

type TSlideDatum = Partial<{
  translate: SharedValue<number>
  animatedStyle: Exclude<StyleProp<AnimatedStyle>, undefined>
}>

type TSlideData = Record<TSlidePosition, TSlideDatum>
type TSlideDataEntry = Entry<TSlideData>

type TSlideDataRecord = Partial<Record<TAxis, TSlideData>>

export type {
  TAxis,
  TSlideData,
  TSlideDataEntry,
  TSlideDataRecord,
  TSlideDatum
}
