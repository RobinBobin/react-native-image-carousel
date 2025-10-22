import type { TSlideData, TTransitionDirection } from '../../types'
import type { TRCarouselDimensions } from './types'

interface ICarouselModelCommonVolatile {
  carouselDimensions?: TRCarouselDimensions
  isAutoTransitionStarted: boolean
  slideData: TSlideData
  transitionDirection: TTransitionDirection
}

type TOnFinished = () => void
type TOnFlinged = (flingDirection: TTransitionDirection) => void

// Type 'ICarouselModelCommonActions' does not satisfy the constraint 'ModelActions'.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TCarouselModelCommonActions = {
  _onFinished: TOnFinished
  _onFlinged: TOnFlinged
}

type TRCarouselModel = Readonly<
  ICarouselModelCommonVolatile & TCarouselModelCommonActions
>

export type {
  ICarouselModelCommonVolatile,
  TCarouselModelCommonActions,
  TRCarouselModel
}
