import type { IAnimatable } from './animatable'
import type { IDurationAndPreTransitionDelay } from './durationAndPreTransitionDelay'
import type { IResettable } from './resettable'
import type { TAnimatedViewStyle } from './types'

type TUseStyle = () => TAnimatedViewStyle

// **NB** `IBaseSlideTransitionAnimation` can't have getters / setters, as `addResettable()` and `addDurationAndPreTransitionDelay()` can't handle them.
interface IBaseSlideTransitionAnimation extends IDurationAndPreTransitionDelay {
  useStyle: TUseStyle
}

type TSlideTransitionAnimation = IBaseSlideTransitionAnimation &
  IAnimatable &
  IResettable

export type {
  IBaseSlideTransitionAnimation,
  TSlideTransitionAnimation,
  TUseStyle
}
