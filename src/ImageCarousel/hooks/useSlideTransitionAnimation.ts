import type { IImageCarouselModelInstance } from '../../mst'
import type { BaseAnimation } from '../../slideTransitionAnimations'

import { useEffect } from 'react'

import { SlideOverAnimation } from '../../slideTransitionAnimations'

export const useSlideTransitionAnimation = (
  carouselModel: IImageCarouselModelInstance
): BaseAnimation => {
  const { setSlideTransitionAnimation, startAutoTransition } = carouselModel

  let slideTransitionAnimation = carouselModel.slideTransitionAnimation

  if (!slideTransitionAnimation) {
    slideTransitionAnimation = new SlideOverAnimation(carouselModel)

    setSlideTransitionAnimation(slideTransitionAnimation)
  }

  useEffect(() => {
    if (slideTransitionAnimation.isAutoTransitionEnabled) {
      startAutoTransition('next')
    }
  }, [slideTransitionAnimation, startAutoTransition])

  slideTransitionAnimation.useStyles()

  return slideTransitionAnimation
}
