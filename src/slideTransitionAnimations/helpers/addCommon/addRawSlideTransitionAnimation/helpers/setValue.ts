import type {
  TRawSlideTransitionAnimationKey,
  TSlideAnimations
} from '../../../../types'

import { SLIDE_IDS } from '../../../../../mst/constants'

export const setValue = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  slideBaseAnimations: TSlideAnimations,
  key: TRawSlideTransitionAnimationKey,
  value: number
): void => {
  SLIDE_IDS.forEach(slideId => {
    slideBaseAnimations[slideId][key] = value
  })
}
