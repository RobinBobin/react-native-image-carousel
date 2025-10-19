import type { IResettable, TRSlideAnimations } from '../../types'

import { SLIDE_IDS } from '../../../mst/constants'

export const addResettable = <T extends TRSlideAnimations<false>>(
  slideAnimations: T
): T & IResettable => {
  return {
    ...slideAnimations,
    reset(params): void {
      SLIDE_IDS.forEach(slideId => {
        slideAnimations[slideId].reset(params)
      })
    }
  }
}
