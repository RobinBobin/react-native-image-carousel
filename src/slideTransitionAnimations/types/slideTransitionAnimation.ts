import type { IRawSlideTransitionAnimation } from './rawSlideTransitionAnimation'
import type { TAnimatedViewStyle } from './types'
import type { TWithAnimation } from './withAnimation'
import type { IWithPrepare } from './withPrepare'

type TUseStyle = () => TAnimatedViewStyle

interface IBaseSlideTransitionAnimation extends IRawSlideTransitionAnimation {
  useStyle: TUseStyle
}

type TSlideTransitionAnimation = IBaseSlideTransitionAnimation &
  TWithAnimation &
  IWithPrepare

type TRSlideTransitionAnimation = Readonly<TSlideTransitionAnimation>

export type {
  IBaseSlideTransitionAnimation,
  TRSlideTransitionAnimation,
  TSlideTransitionAnimation,
  TUseStyle
}
