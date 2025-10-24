import type { TSlideTransitionAnimation } from '../../types'
import type { TGetSlideTransitionAnimationParams } from './types'

import { getSlideDatum } from '../getSlideDatum'

export const getSlideTransitionAnimation = (
  params: TGetSlideTransitionAnimationParams
): TSlideTransitionAnimation => {
  const [slideId] = getSlideDatum(params)

  return params.animation[slideId]
}
