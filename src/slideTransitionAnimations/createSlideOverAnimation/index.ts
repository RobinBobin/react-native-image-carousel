import type { TSlideId } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'
import type { TAnimate, TReset, TSlidesTransitionAnimation } from '../types'

import { addDurationAndPreTransitionDelay } from '../helpers'
import { create } from './create'

export const createSlideOverAnimation = (): TSlidesTransitionAnimation => {
  const slides = {
    slide1: create('slide1'),
    slide2: create('slide2'),
    slide3: create('slide3')
  }

  const animation = addDurationAndPreTransitionDelay(slides)

  const animate: TAnimate = params => {
    const { slideData, transitionDirection } = params

    const slideDatum = Object.entries(slideData).find(([, [position]]) => {
      return position === transitionDirection
    })

    if (!slideDatum) {
      console.log('animate()', transitionDirection, 'no slideDatum')

      return
    }

    const slideId = slideDatum[0] as TSlideId

    const slide = animation[slideId]

    slide.animate(params)
  }

  const reset: TReset = values => {
    console.log('reset()', values)

    animation.slide1.reset(values)
    animation.slide2.reset(values)
    animation.slide3.reset(values)
  }

  return {
    ...animation,
    animate,
    reset
  }
}
