import type {
  TAnimate,
  THandleFling,
  TSlideGroupTransitionAnimation
} from '../types'

import { objectify } from 'radashi'

import { SLIDE_IDS } from '../../mst/constants'
import { addCommon, getSlide } from '../helpers'
import { create } from './create'

export const createSlideOverAnimation = (): TSlideGroupTransitionAnimation => {
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

  return Object.assign(animation, { animate, handleFling })
}
