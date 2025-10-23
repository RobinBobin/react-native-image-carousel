import type { TRCarouselModel } from '../../mst'
import type { TSlideGroupTransitionAnimation } from '../types'

import { objectify, partial } from 'radashi'

import { SLIDE_IDS } from '../../mst/constants'
import { addCommon, combine } from '../helpers'
import { addAnimationMethods, createSlideTransitionAnimation } from './helpers'

export const createSlideOverAnimation = (
  carouselModel: TRCarouselModel
): TSlideGroupTransitionAnimation => {
  const create = partial(createSlideTransitionAnimation, carouselModel)

  const animation = addCommon(objectify(SLIDE_IDS, slideId => slideId, create))

  const { animate, cancelCurrentAnimation } = addAnimationMethods(
    animation,
    carouselModel
  )

  return combine(animation, { animate, cancelCurrentAnimation })
}
