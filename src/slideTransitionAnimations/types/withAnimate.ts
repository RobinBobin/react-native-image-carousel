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

interface IWithAnimate {
  animate: TAnimate
}

export type { IWithAnimate, TAnimate, TAnimateParams, TOnFinished }
