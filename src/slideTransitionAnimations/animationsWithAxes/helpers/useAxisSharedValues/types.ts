import type { TAxes, TAxis, TSlidePosition } from '../../../../types'
import type { TSlideSharedValues, TValue } from '../types'

type TGetInitialValue<Value extends TValue> = (axis: TAxis) => Value

export interface IUseAxisSharedValuesParams<Value extends TValue> {
  axes: TAxes
  getInitialValue: TGetInitialValue<Value>
  slidePosition: TSlidePosition
  slideSharedValues: TSlideSharedValues<true, Value>
}
