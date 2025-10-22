import type { IRawSlideTransitionAnimation } from './rawSlideTransitionAnimation'
import type { TAnimatedViewStyle } from './types'
import type { IWithAnimation } from './withAnimation'
import type { IWithHandleFling } from './withHandleFling'
import type { IWithPrepare } from './withPrepare'

type TUseStyle = () => TAnimatedViewStyle

interface IBaseSlideTransitionAnimation extends IRawSlideTransitionAnimation {
  useStyle: TUseStyle
}

type TSlideTransitionAnimation = IBaseSlideTransitionAnimation &
  IWithAnimation &
  IWithHandleFling &
  IWithPrepare

type TRSlideTransitionAnimation = Readonly<TSlideTransitionAnimation>

export type {
  IBaseSlideTransitionAnimation,
  TRSlideTransitionAnimation,
  TSlideTransitionAnimation,
  TUseStyle
}
