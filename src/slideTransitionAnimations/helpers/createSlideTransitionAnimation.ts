import type {
  TAnimate,
  TReset,
  TSlideTransitionAnimation,
  TUseStyle
} from '../types'

export const createSlideTransitionAnimation = (): TSlideTransitionAnimation => {
  const animate: TAnimate = () => {
    // Stub
  }

  const reset: TReset = () => {
    // Stub
  }

  const useStyle: TUseStyle = () => undefined

  return {
    animate,
    duration: 1000,
    preTransitionDelay: 1000,
    reset,
    useStyle
  }
}
