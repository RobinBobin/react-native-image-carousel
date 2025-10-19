import type { TRDurationAndPreTransitionDelay } from '../types'

export const getPreTransitionDelay = (
  { preTransitionDelay }: TRDurationAndPreTransitionDelay,
  isAutoTransitionStarted: boolean
): number => {
  return isAutoTransitionStarted ? preTransitionDelay : 0
}
