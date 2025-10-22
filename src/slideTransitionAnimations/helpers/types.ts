import type {
  IIsAnimationInProgress,
  IRawSlideTransitionAnimation,
  IWithPrepare,
  TSlideAnimations
} from '../types'

type TAddCommonReturnType = TSlideAnimations<false> &
  IIsAnimationInProgress &
  IRawSlideTransitionAnimation &
  IWithPrepare

export type { TAddCommonReturnType }
