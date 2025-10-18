import type { SharedValue } from 'react-native-reanimated'
import type { TAxes, TAxis, TSlidePosition } from '../../../../types'
import type { TSlideSharedValues, TValue } from '../types'

type TGetSharedValue<Value extends TValue = number> = (
  slidePosition: TSlidePosition,
  axis?: TAxis
) => SharedValue<Value>

interface IGetSharedValueParams<Value extends TValue> {
  axes: TAxes
  axis: TAxis | undefined
  slidePosition: TSlidePosition
  slideSharedValues: TSlideSharedValues<true, Value>
  tag: string
}

export type { IGetSharedValueParams, TGetSharedValue }
