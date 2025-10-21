import type {
  IWithDurationAndPreTransitionDelay,
  IWithPrepare,
  TSlideAnimations
} from '../types'

type TAddCommonReturnType = TSlideAnimations<false> &
  IWithDurationAndPreTransitionDelay &
  IWithPrepare

export type { TAddCommonReturnType }
