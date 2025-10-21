import type { IWithPrepare, TRSlideAnimations } from '../../types'

import { SLIDE_IDS } from '../../../mst/constants'

export const addWithPrepare = <T extends TRSlideAnimations<false>>(
  slideAnimations: T
): T & IWithPrepare => {
  return {
    ...slideAnimations,
    prepare(params): void {
      SLIDE_IDS.forEach(slideId => {
        slideAnimations[slideId].prepare(params)
      })
    }
  }
}
