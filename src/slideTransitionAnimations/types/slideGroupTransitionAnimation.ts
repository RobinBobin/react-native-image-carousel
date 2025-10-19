import type { ReadonlyDeep } from 'type-fest'
import type { TSlideId } from '../../mst'
import type { IAnimatable } from './animatable'
import type { IDurationAndPreTransitionDelay } from './durationAndPreTransitionDelay'
import type { IResettable } from './resettable'
import type {
  IBaseSlideTransitionAnimation,
  TSlideTransitionAnimation
} from './slideTransitionAnimation'

type TSlideAnimations<TIsBase extends boolean = true> = Record<
  TSlideId,
  TIsBase extends true ? IBaseSlideTransitionAnimation
  : TSlideTransitionAnimation
>

type TRSlideAnimations<TIsBase extends boolean = true> = ReadonlyDeep<
  TSlideAnimations<TIsBase>
>

type TSlideGroupTransitionAnimation = TSlideAnimations &
  IAnimatable &
  IDurationAndPreTransitionDelay &
  IResettable

export type {
  TRSlideAnimations,
  TSlideAnimations,
  TSlideGroupTransitionAnimation
}
