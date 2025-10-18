import type {
  IDurationAndPreTransitionDelay,
  TSlideAnimations
} from '../../../types'

import { SLIDE_IDS } from '../../../../constants'

export const setValue = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  slideBaseAnimations: TSlideAnimations,
  key: keyof IDurationAndPreTransitionDelay,
  value: number
): void => {
  SLIDE_IDS.forEach(slideId => {
    slideBaseAnimations[slideId][key] = value
  })
}
