import type { IRawSlideTransitionAnimation } from './rawSlideTransitionAnimation'
import type { TAnimatedViewStyle } from './types'
import type { IWithAnimate } from './withAnimate'
import type { IWithHandleFling } from './withHandleFling'
import type { IWithPrepare } from './withPrepare'

type TUseStyle = () => TAnimatedViewStyle

// **NB** `IBaseSlideTransitionAnimation` can't have getters / setters, as `addWithPrepare()` and `addRawSlideTransitionAnimation()` can't handle them.
interface IBaseSlideTransitionAnimation extends IRawSlideTransitionAnimation {
  useStyle: TUseStyle
}

type TSlideTransitionAnimation = IBaseSlideTransitionAnimation &
  IWithAnimate &
  IWithHandleFling &
  IWithPrepare

type TRSlideTransitionAnimation = Readonly<TSlideTransitionAnimation>

export type {
  IBaseSlideTransitionAnimation,
  TRSlideTransitionAnimation,
  TSlideTransitionAnimation,
  TUseStyle
}
