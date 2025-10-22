import type { IWithPrepare, TPrepare, TRSlideAnimations } from '../../types'

import { SLIDE_IDS } from '../../../mst/constants'
import { combine } from '../combine'

export const addWithPrepare = <T extends TRSlideAnimations<false>>(
  rawSlideGroupAnimation: T
): T & IWithPrepare => {
  const prepare: TPrepare = params => {
    SLIDE_IDS.forEach(slideId => {
      rawSlideGroupAnimation[slideId].prepare(params)
    })
  }

  return combine(rawSlideGroupAnimation, { prepare })
}
