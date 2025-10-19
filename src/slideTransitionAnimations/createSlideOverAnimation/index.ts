import type { TAnimate, TSlideGroupTransitionAnimation } from '../types'

import { objectify } from 'radashi'

import { SLIDE_IDS } from '../../mst/constants'
import { addCommon, getSlideDatum } from '../helpers'
import { create } from './create'

export const createSlideOverAnimation = (): TSlideGroupTransitionAnimation => {
  const animation = addCommon(objectify(SLIDE_IDS, slideId => slideId, create))

  const animate: TAnimate = params => {
    const { slideData, transitionDirection } = params

    const [slideId] = getSlideDatum(slideData, transitionDirection)

    animation[slideId].animate(params)
  }

  return {
    ...animation,
    animate
  }
}
