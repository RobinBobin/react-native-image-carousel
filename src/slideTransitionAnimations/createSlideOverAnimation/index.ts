import type { TRCarouselModelVolatileBase } from '../../mst'
import type {
  TAnimate,
  THandleFling,
  TSlideGroupTransitionAnimation
} from '../types'

import { objectify, partial } from 'radashi'

import { SLIDE_IDS } from '../../mst/constants'
import { addCommon, combine, getSlide } from '../helpers'
import { createSlideTransitionAnimation } from './createSlideTransitionAnimation'

export const createSlideOverAnimation = (
  base: TRCarouselModelVolatileBase
): TSlideGroupTransitionAnimation => {
  const create = partial(createSlideTransitionAnimation, base)

  const animation = addCommon(objectify(SLIDE_IDS, slideId => slideId, create))

  const animate: TAnimate = params => {
    const { slideData, transitionDirection } = params

    getSlide({ animation, slideData, transitionDirection }).animate(params)
  }

  const handleFling: THandleFling = params => {
    const { slideData, transitionDirection } = params

    getSlide({
      animation,
      slideData,
      transitionDirection
    }).handleFling(params)
  }

  return combine(animation, { animate, handleFling })
}
