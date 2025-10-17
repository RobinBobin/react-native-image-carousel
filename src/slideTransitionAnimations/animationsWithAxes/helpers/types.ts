import type { SharedValue } from 'react-native-reanimated'
import type { ReadonlyDeep } from 'type-fest'
import type { TAnimatedViewStyle, TAxis, TSlidePosition } from '../../../types'

type TAxisSharedValues<TCanBeUndefined = false, Value = number> = Partial<
  Record<
    TAxis,
    SharedValue<Value> | (TCanBeUndefined extends true ? undefined : never)
  >
>

type TGetAnimatedViewStyle<Value = number> = (
  axisSharedValues: ReadonlyDeep<TAxisSharedValues<false, Value>>
) => TAnimatedViewStyle

type TUseSharedValues<Value = number> = (
  slidePosition: TSlidePosition
) => TAxisSharedValues<false, Value>

type TSlideSharedValues<TCanBeUndefined = false, Value = number> = Record<
  TSlidePosition,
  TAxisSharedValues<TCanBeUndefined, Value>
>

type TWithReturnType<T, Value = number> = T & {
  useSharedValues: TUseSharedValues<Value>
}

export type {
  TAxisSharedValues,
  TGetAnimatedViewStyle,
  TSlideSharedValues,
  TUseSharedValues,
  TWithReturnType
}
