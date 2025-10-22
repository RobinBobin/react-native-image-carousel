import type { TRCarouselModel } from '../../mst'
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
  carouselModel: TRCarouselModel
): TSlideGroupTransitionAnimation => {
  const create = partial(createSlideTransitionAnimation, carouselModel)

  const animation = addCommon(objectify(SLIDE_IDS, slideId => slideId, create))

  const animate: TAnimate = () => {
    const { slideData, transitionDirection } = carouselModel

    getSlide({ animation, slideData, transitionDirection }).animate()
  }

  const handleFling: THandleFling = params => {
    const { slideData, transitionDirection } = carouselModel

    getSlide({
      animation,
      slideData,
      transitionDirection
    }).handleFling(params)
  }

  return combine(animation, { animate, handleFling })
}
