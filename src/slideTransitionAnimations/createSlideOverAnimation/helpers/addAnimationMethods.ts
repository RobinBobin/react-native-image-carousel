import type { TRCarouselModel } from '../../../mst'
import type { TRAddCommonReturnType } from '../../helpers'
import type {
  IAnimationMethods,
  TAnimate,
  TCancelInProgressAnimation,
  TSlideTransitionAnimation
} from '../../types'

import { getSlide } from '../../helpers'

export const addAnimationMethods = (
  animation: TRAddCommonReturnType,
  carouselModel: TRCarouselModel
): IAnimationMethods => {
  const _getSlide = (): TSlideTransitionAnimation => {
    const { slideData, transitionDirection } = carouselModel

    return getSlide({
      animation,
      slideData,
      slidePosition: transitionDirection
    })
  }

  const animate: TAnimate = () => {
    _getSlide().animate()
  }

  const cancelInProgressAnimation: TCancelInProgressAnimation = () => {
    _getSlide().cancelInProgressAnimation()
  }

  return { animate, cancelInProgressAnimation }
}
