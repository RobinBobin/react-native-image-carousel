import type { TRSlideAnimations } from '../../types'
import type { TAddCommonReturnType } from '../types'

import { addRawSlideTransitionAnimation } from './addRawSlideTransitionAnimation'
import { addWithPrepare } from './addWithPrepare'

export const addCommon = (
  slideAnimations: TRSlideAnimations<false>
): TAddCommonReturnType => {
  return addRawSlideTransitionAnimation(addWithPrepare(slideAnimations))
}
