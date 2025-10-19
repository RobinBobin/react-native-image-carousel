import type {
  IDurationAndPreTransitionDelay,
  IResettable,
  TRSlideAnimations,
  TSlideAnimations
} from '../../types'

import { addDurationAndPreTransitionDelay } from './addDurationAndPreTransitionDelay'
import { addResettable } from './addResettable'

export const addCommon = (
  slideAnimations: TRSlideAnimations<false>
): TSlideAnimations<false> & IDurationAndPreTransitionDelay & IResettable => {
  return addDurationAndPreTransitionDelay(addResettable(slideAnimations))
}
