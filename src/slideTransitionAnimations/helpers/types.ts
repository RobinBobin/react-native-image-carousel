import type { ReadonlyDeep } from 'type-fest'
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

type TRAddCommonReturnType = ReadonlyDeep<TAddCommonReturnType>

export type { TAddCommonReturnType, TRAddCommonReturnType }
