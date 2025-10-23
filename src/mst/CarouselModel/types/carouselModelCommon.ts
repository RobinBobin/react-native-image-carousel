import type { TSlideData, TTransitionDirection } from '../../types'
import type { TRCarouselDimensions } from './types'

interface ICarouselModelCommonVolatile {
  carouselDimensions?: TRCarouselDimensions
  isAutoTransitionStarted: boolean
  slideData: TSlideData
  transitionDirection: TTransitionDirection
}

type TOnCurrentAnimationCancelled = () => void
type TOnFinished = () => void

// A type is used to avoid `Type 'ICarouselModelCommonActions' does not satisfy the constraint 'ModelActions'`.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TCarouselModelCommonActions = {
  _onCurrentAnimationCancelled: TOnCurrentAnimationCancelled
  _onFinished: TOnFinished
}

type TRCarouselModel = Readonly<
  ICarouselModelCommonVolatile & TCarouselModelCommonActions
>

export type {
  ICarouselModelCommonVolatile,
  TCarouselModelCommonActions,
  TRCarouselModel
}
