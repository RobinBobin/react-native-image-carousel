import type { TSlideTransitionAnimation } from '../../types'
import type { TGetSlideParams } from './types'

import { getSlideDatum } from '../getSlideDatum'

export const getSlide = (
  params: TGetSlideParams
): TSlideTransitionAnimation => {
  const [slideId] = getSlideDatum(params)

  return params.animation[slideId]
}
