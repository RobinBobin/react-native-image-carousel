import type { TRSlideAnimations } from '../../types'
import type { TAddCommonReturnType } from '../types'

import { chain } from 'radashi'

import { addIsAnimationInProgress } from './addIsAnimationInProgress'
import { addRawSlideTransitionAnimation } from './addRawSlideTransitionAnimation'
import { addWithPrepare } from './addWithPrepare'

export const addCommon = (
  slideAnimations: TRSlideAnimations<false>
): TAddCommonReturnType => {
  return chain(
    addIsAnimationInProgress,
    addRawSlideTransitionAnimation,
    addWithPrepare
  )(slideAnimations)
}
