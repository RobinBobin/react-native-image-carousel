import type {
  IRawSlideTransitionAnimation,
  TRSlideAnimations
} from '../../../types'

import { combine } from '../../combine'
import { ensureEquality, setValue } from './helpers'

export const addRawSlideTransitionAnimation = <
  T extends TRSlideAnimations<false>
>(
  rawSlideGroupAnimation: T
): T & IRawSlideTransitionAnimation => {
  return combine(rawSlideGroupAnimation, {
    get duration(): number {
      return ensureEquality(rawSlideGroupAnimation, 'duration')
    },
    set duration(duration: number) {
      setValue(rawSlideGroupAnimation, 'duration', duration)
    },
    get preTransitionDelay(): number {
      return ensureEquality(rawSlideGroupAnimation, 'preTransitionDelay')
    },
    set preTransitionDelay(preTransitionDelay: number) {
      setValue(rawSlideGroupAnimation, 'preTransitionDelay', preTransitionDelay)
    }
  })
}
