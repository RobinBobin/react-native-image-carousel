import type { IImageCarouselModelInstance } from '../../../mst'

import { useMemo } from 'react'

import { SlideOverAnimation } from '../../../slideTransitionAnimations'

export const useSlideTransitionAnimation = (
  carouselModel: IImageCarouselModelInstance
): void => {
  const slideTransitionAnimation = useMemo(() => {
    let animation = carouselModel.slideTransitionAnimation

    if (!animation) {
      animation = new SlideOverAnimation(carouselModel)

      carouselModel.setSlideTransitionAnimation(animation)
    }

    return animation
  }, [carouselModel])

  slideTransitionAnimation.useStyles()
}
