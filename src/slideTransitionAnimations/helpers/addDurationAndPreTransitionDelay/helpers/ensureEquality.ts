import type {
  IDurationAndPreTransitionDelay,
  TRSlideAnimations
} from '../../../types'

import { isNumber } from 'radashi'
import { verify } from 'simple-common-utils'

import { SLIDE_IDS } from '../../../../constants'

export const ensureEquality = (
  slideBaseAnimations: TRSlideAnimations,
  key: keyof IDurationAndPreTransitionDelay
): number => {
  const values = SLIDE_IDS.map(slideId => slideBaseAnimations[slideId][key])
  const errorMessage = `'ensureEquality(${key})' failed: [${values.join(', ')}]`

  verify(Math.max(...values) === Math.min(...values), errorMessage)

  const [value] = values

  verify(isNumber(value), errorMessage)

  return value
}
