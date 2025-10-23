import type { TSlideData, TTransitionDirection } from '../../types'
import type { TRCarouselDimensions } from './types'

interface ICarouselModelCommonViews {
  reversedTransitionDirection: TTransitionDirection
}

interface ICarouselModelCommonVolatile {
  carouselDimensions?: TRCarouselDimensions
  isAutoTransitionStarted: boolean
  slideData: TSlideData
  transitionDirection: TTransitionDirection
}

type TOnInProgressAnimationCancelled = () => void
type TOnFinished = () => void

// A type is used to avoid `Type 'ICarouselModelCommonActions' does not satisfy the constraint 'ModelActions'`.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TCarouselModelCommonActions = {
  _onInProgressAnimationCancelled: TOnInProgressAnimationCancelled
  _onFinished: TOnFinished
}

type TRCarouselModel = Readonly<
  ICarouselModelCommonViews &
    ICarouselModelCommonVolatile &
    TCarouselModelCommonActions
>

export type {
  ICarouselModelCommonViews,
  ICarouselModelCommonVolatile,
  TCarouselModelCommonActions,
  TRCarouselModel
}
