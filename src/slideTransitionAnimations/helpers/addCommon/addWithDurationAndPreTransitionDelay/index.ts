import type {
  IWithDurationAndPreTransitionDelay,
  TRSlideAnimations
} from '../../../types'

import { ensureEquality, setValue } from './helpers'

// eslint-disable-next-line id-length
export const addWithDurationAndPreTransitionDelay = <
  T extends TRSlideAnimations<false>
>(
  slideAnimations: T
): T & IWithDurationAndPreTransitionDelay => {
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
