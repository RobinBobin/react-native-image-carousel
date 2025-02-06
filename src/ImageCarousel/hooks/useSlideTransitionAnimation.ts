import type { IImageCarouselModelInstance } from '../../mst'
import type { BaseAnimation } from '../../slideTransitionAnimations'

import { useEffect, useRef } from 'react'

import { SlideOverAnimation } from '../../slideTransitionAnimations'

export const useSlideTransitionAnimation = (
  carouselModel: IImageCarouselModelInstance
): BaseAnimation => {
  const slideTransitionAnimation = useRef(
    carouselModel.slideTransitionAnimation ??
      new SlideOverAnimation(carouselModel)
  )

  const { setSlideTransitionAnimation, startAutoTransition } = carouselModel

  useEffect(() => {
    if (!carouselModel.slideTransitionAnimation) {
      setSlideTransitionAnimation(slideTransitionAnimation.current)
    }
  }, [carouselModel.slideTransitionAnimation, setSlideTransitionAnimation])

  useEffect(() => {
    if (slideTransitionAnimation.current.isAutoTransitionEnabled) {
      startAutoTransition('next')
    }
  }, [startAutoTransition])

  slideTransitionAnimation.current.useStyles()

  return slideTransitionAnimation.current
}
