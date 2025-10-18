import type { TAnimatedViewStyle } from '../../types'
import type { IAnimatable } from './animatable'
import type { IDurationAndPreTransitionDelay } from './durationAndPreTransitionDelay'
import type { IResettable } from './resettable'

type TUseStyle = () => TAnimatedViewStyle

interface IBaseSlideTransitionAnimation extends IDurationAndPreTransitionDelay {
  outputTranslate: () => void
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
