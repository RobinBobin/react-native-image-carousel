import type {
  IRawSlideTransitionAnimation,
  IWithPrepare,
  TSlideAnimations
} from '../types'

type TAddCommonReturnType = TSlideAnimations<false> &
  IRawSlideTransitionAnimation &
  IWithPrepare

export type { TAddCommonReturnType }
