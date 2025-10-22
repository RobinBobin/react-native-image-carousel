import type { ReadonlyDeep } from 'type-fest'
import type { TSlideId } from '../../mst'
import type { IRawSlideTransitionAnimation } from './rawSlideTransitionAnimation'
import type {
  IBaseSlideTransitionAnimation,
  TSlideTransitionAnimation
} from './slideTransitionAnimation'
import type { IWithAnimate } from './withAnimate'
import type { IWithHandleFling } from './withHandleFling'
import type { IWithPrepare } from './withPrepare'

type TSlideAnimations<TIsBase extends boolean = true> = Record<
  TSlideId,
  TIsBase extends true ? IBaseSlideTransitionAnimation
  : TSlideTransitionAnimation
>

type TRSlideAnimations<TIsBase extends boolean = true> = ReadonlyDeep<
  TSlideAnimations<TIsBase>
>

type TSlideGroupTransitionAnimation = TSlideAnimations &
  IRawSlideTransitionAnimation &
  IWithAnimate &
  IWithHandleFling &
  IWithPrepare

type TRSlideGroupTransitionAnimation =
  ReadonlyDeep<TSlideGroupTransitionAnimation>

export type {
  TRSlideAnimations,
  TRSlideGroupTransitionAnimation,
  TSlideAnimations,
  TSlideGroupTransitionAnimation
}
