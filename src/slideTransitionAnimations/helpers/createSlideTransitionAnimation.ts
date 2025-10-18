import type {
  TAnimate,
  TReset,
  TSlideTransitionAnimation,
  TUseStyle
} from '../types'

export const createSlideTransitionAnimation = (): TSlideTransitionAnimation => {
  const animate: TAnimate = () => {
    // Nothing to do.
  }

  const reset: TReset = () => {
    // Nothing to do
  }

  const useStyle: TUseStyle = () => undefined

  return {
    animate,
    duration: 1000,
    outputTranslate(): void {
      console.log('outputTranslate() nothing')
    },
    preTransitionDelay: 1000,
    reset,
    useStyle
  }
}
