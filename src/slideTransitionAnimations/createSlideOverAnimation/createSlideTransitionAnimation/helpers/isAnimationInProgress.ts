import type { IIsAnimationInProgress } from '../../../types'

export const isAnimationInProgress = (): IIsAnimationInProgress => ({
  get isAnimationInProgress(): boolean {
    throw new Error('isAnimationInProgress not implemented')
  }
})
