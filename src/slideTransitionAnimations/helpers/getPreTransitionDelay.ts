import type { TRRawSlideTransitionAnimation } from '../types'

export const getPreTransitionDelay = (
  { preTransitionDelay }: TRRawSlideTransitionAnimation,
  isAutoTransitionStarted: boolean
): number => {
  return isAutoTransitionStarted ? preTransitionDelay : 0
}
