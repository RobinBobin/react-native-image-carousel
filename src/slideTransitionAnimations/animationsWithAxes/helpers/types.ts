import type { SharedValue } from 'react-native-reanimated'
import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../../../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAxes, TAxis, TSlidePosition } from '../../../types'

type TValue = number | `${number}%`

type TAxisSharedValues<
  TCanBeUndefined = false,
  Value extends TValue = number
> = Partial<
  Record<
    TAxis,
    SharedValue<Value> | (TCanBeUndefined extends true ? undefined : never)
  >
>

type TSlideSharedValues<
  TCanBeUndefined = false,
  Value extends TValue = number
> = Record<TSlidePosition, TAxisSharedValues<TCanBeUndefined, Value>>

type TUseAxisSharedValues<Value extends TValue = number> = (
  slidePosition: TSlidePosition
) => TAxisSharedValues<false, Value>

type TWithSlideSharedValues<TReturnType> = (
  axes: TAxes,
  carouselModel: ISlideTransitionAnimationAccessibleImageCarouselModelInstance
) => TReturnType

export type {
  TAxisSharedValues,
  TSlideSharedValues,
  TUseAxisSharedValues,
  TValue,
  TWithSlideSharedValues
}
