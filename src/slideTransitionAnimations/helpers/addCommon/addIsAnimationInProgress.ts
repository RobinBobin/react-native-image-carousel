import type { IIsAnimationInProgress, TRSlideAnimations } from '../../types'

import { SLIDE_IDS } from '../../../mst/constants'
import { combine } from '../combine'

export const addIsAnimationInProgress = <T extends TRSlideAnimations<false>>(
  rawSlideGroupAnimation: T
): T & IIsAnimationInProgress => {
  return combine(rawSlideGroupAnimation, {
    get isAnimationInProgress(): boolean {
      return SLIDE_IDS.some(
        slideId => rawSlideGroupAnimation[slideId].isAnimationInProgress
      )
    }
  })
}
