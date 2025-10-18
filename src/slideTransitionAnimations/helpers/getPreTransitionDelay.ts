import type { TRDurationAndPreTransitionDelay } from '../types'

export const getPreTransitionDelay = (
  { preTransitionDelay }: TRDurationAndPreTransitionDelay,
  isAutoTransitionStarted: boolean
): number => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return isAutoTransitionStarted ? preTransitionDelay : 0
}
