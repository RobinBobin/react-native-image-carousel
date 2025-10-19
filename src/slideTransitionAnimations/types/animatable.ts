import type { ICarouselModelVolatile } from '../../mst'

type TAnimationCancelled = () => void
type TAnimationFinished = (params?: unknown) => void

type TFromCarouselModelVolatile = Pick<
  ICarouselModelVolatile,
  'isAutoTransitionStarted' | 'slideData' | 'transitionDirection'
>

type TAnimateParams = Readonly<
  TFromCarouselModelVolatile & {
    onCancel?: TAnimationCancelled | undefined
    onFinish: TAnimationFinished
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
  TAnimationFinished
}
