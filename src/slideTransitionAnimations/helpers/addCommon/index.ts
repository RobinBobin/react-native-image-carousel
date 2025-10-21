import type { TRSlideAnimations } from '../../types'
import type { TAddCommonReturnType } from '../types'

import { addWithDurationAndPreTransitionDelay } from './addWithDurationAndPreTransitionDelay'
import { addWithPrepare } from './addWithPrepare'

export const addCommon = (
  slideAnimations: TRSlideAnimations<false>
): TAddCommonReturnType => {
  return addWithDurationAndPreTransitionDelay(addWithPrepare(slideAnimations))
}
