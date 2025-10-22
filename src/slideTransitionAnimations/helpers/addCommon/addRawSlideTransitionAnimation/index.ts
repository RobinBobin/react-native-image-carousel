import type {
  IRawSlideTransitionAnimation,
  TRSlideAnimations
} from '../../../types'

import { ensureEquality, setValue } from './helpers'

export const addRawSlideTransitionAnimation = <
  T extends TRSlideAnimations<false>
>(
  slideAnimations: T
): T & IRawSlideTransitionAnimation => {
  return {
    ...slideAnimations,
    get duration(): number {
      return ensureEquality(this, 'duration')
    },
    set duration(duration: number) {
      setValue(this, 'duration', duration)
    },
    get preTransitionDelay(): number {
      return ensureEquality(this, 'preTransitionDelay')
    },
    set preTransitionDelay(preTransitionDelay: number) {
      setValue(this, 'preTransitionDelay', preTransitionDelay)
    }
  }
}
