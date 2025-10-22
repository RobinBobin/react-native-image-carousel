import type { IRawSlideTransitionAnimation } from '../types'

// eslint-disable-next-line id-length
export const createRawSlideTransitionAnimation =
  (): IRawSlideTransitionAnimation => {
    return {
      duration: 1000,
      preTransitionDelay: 1000
    }
  }
