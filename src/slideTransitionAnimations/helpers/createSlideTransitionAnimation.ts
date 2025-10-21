import type { TSlideTransitionAnimation } from '../types'

import { noop } from 'radashi'

export const createSlideTransitionAnimation = (): TSlideTransitionAnimation => {
  return {
    animate: noop,
    duration: 1000,
    handleFling: noop,
    preTransitionDelay: 1000,
    prepare: noop,
    useStyle: noop
  }
}
