import type { TRWithDurationAndPreTransitionDelay } from '../types'

export const getPreTransitionDelay = (
  { preTransitionDelay }: TRWithDurationAndPreTransitionDelay,
  isAutoTransitionStarted: boolean
): number => {
  return isAutoTransitionStarted ? preTransitionDelay : 0
}
