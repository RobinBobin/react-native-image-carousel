import type { TRCarouselModel, TSlideId } from '../../../../mst'
import type { TSlideTransitionAnimation } from '../../../types'

import {
  combine,
  createISharedValue,
  createRawSlideTransitionAnimation
} from '../../../helpers'
import {
  _useStyle,
  animate,
  cancelCurrentAnimation,
  isAnimationInProgress,
  prepare
} from './helpers'

export const createSlideTransitionAnimation = (
  carouselModel: TRCarouselModel,
  slideId: TSlideId
): TSlideTransitionAnimation => {
  const rawAnimation = createRawSlideTransitionAnimation()

  const translateX = createISharedValue<number>()

  return combine(
    combine(
      rawAnimation,
      isAnimationInProgress(carouselModel, slideId, translateX)
    ),
    {
      animate: animate(carouselModel, rawAnimation, translateX),
      cancelCurrentAnimation: cancelCurrentAnimation(
        carouselModel,
        rawAnimation,
        slideId,
        translateX
      ),
      prepare: prepare(carouselModel, slideId, translateX),
      useStyle: _useStyle(slideId, translateX)
    }
  )
}
