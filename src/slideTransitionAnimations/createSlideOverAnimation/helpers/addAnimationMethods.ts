import type { TRCarouselModel } from '../../../mst'
import type { TRAddCommonReturnType } from '../../helpers'
import type {
  IAnimationMethods,
  TAnimate,
  TCancelCurrentAnimation,
  TSlideTransitionAnimation
} from '../../types'

import { getSlide } from '../../helpers'

export const addAnimationMethods = (
  animation: TRAddCommonReturnType,
  carouselModel: TRCarouselModel
): IAnimationMethods => {
  const _getSlide = (): TSlideTransitionAnimation => {
    const { slideData, transitionDirection } = carouselModel

    return getSlide({ animation, slideData, transitionDirection })
  }

  const animate: TAnimate = () => {
    _getSlide().animate()
  }

  const cancelCurrentAnimation: TCancelCurrentAnimation = () => {
    _getSlide().cancelCurrentAnimation()
  }

  return { animate, cancelCurrentAnimation }
}
