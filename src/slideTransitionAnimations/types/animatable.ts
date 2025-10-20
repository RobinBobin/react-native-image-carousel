import type { ICarouselModelVolatile, TTransitionDirection } from '../../mst'

type TAnimationCancelled = () => void
type TAnimationInterrupted = TAnimationCancelled

type TAnimationFinished = (
  actualTransitionDirection: TTransitionDirection
) => void

type TFromCarouselModelVolatile = Pick<
  ICarouselModelVolatile,
  'isAutoTransitionStarted' | 'slideData' | 'transitionDirection'
>

type TAnimateParams = Readonly<
  TFromCarouselModelVolatile & {
    // onCancelled: TAnimationCancelled
    onFinish: TAnimationFinished
    // onInterrupted: TAnimationInterrupted
  }
>

type TAnimate = (params: TAnimateParams) => void

interface IAnimatable {
  animate: TAnimate
}

export type {
  IAnimatable,
  TAnimate,
  TAnimateParams,
  TAnimationCancelled,
  TAnimationFinished,
  TAnimationInterrupted
}
