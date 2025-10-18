import type { ISlideTransitionAnimationAccessibleImageCarouselModelVolatile } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'

type TAnimationCancelled = () => void
type TAnimationFinished = (params?: unknown) => void

type TAnimateParams = Readonly<
  Pick<
    ISlideTransitionAnimationAccessibleImageCarouselModelVolatile,
    'isAutoTransitionStarted' | 'slideData' | 'transitionDirection'
  > & {
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
