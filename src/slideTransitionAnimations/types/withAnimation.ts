import type { ICarouselModelVolatile } from '../../mst'
import type { TSlideDataAndTransitionDirection } from './types'

type TOnFinished = () => void

type TAnimateParams = TSlideDataAndTransitionDirection &
  Readonly<
    Pick<ICarouselModelVolatile, 'isAutoTransitionStarted'> & {
      onFinished: TOnFinished
    }
  >

type TAnimate = (params: TAnimateParams) => void

interface IIsAnimationInProgress {
  get isAnimationInProgress(): boolean
}

interface IWithAnimation extends IIsAnimationInProgress {
  animate: TAnimate
}

export type {
  IIsAnimationInProgress,
  IWithAnimation,
  TAnimate,
  TAnimateParams,
  TOnFinished
}
