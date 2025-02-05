import type { IImageCarouselModelInstance } from '../../mst'
import type { BaseAnimation } from '../../slideTransitionAnimations'

import { useEffect } from 'react'

import { SlideOverAnimation } from '../../slideTransitionAnimations'

export const useSlideTransitionAnimation = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  carouselModel: IImageCarouselModelInstance
): BaseAnimation => {
  const { canTransition, setSlideTransitionAnimation, startAutoTransition } =
    carouselModel

  let slideTransitionAnimation = carouselModel.slideTransitionAnimation

  if (!slideTransitionAnimation) {
    slideTransitionAnimation = new SlideOverAnimation(carouselModel)

    setSlideTransitionAnimation(slideTransitionAnimation)
  }

  useEffect(() => {
    if (
      canTransition &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      carouselModel.slideTransitionAnimation!.isAutoTransitionEnabled
    ) {
      startAutoTransition('next')
    }
  }, [
    canTransition,
    carouselModel.slideTransitionAnimation,
    startAutoTransition
  ])

  slideTransitionAnimation.useStyles()

  return slideTransitionAnimation
}
