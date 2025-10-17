import type { TSlidePosition, TTransitionDirection } from './types'

const SLIDE_POSITIONS: readonly TSlidePosition[] = [
  'current',
  'next',
  'previous'
]

const TRANSITION_DIRECTIONS: readonly TTransitionDirection[] = [
  'next',
  'previous'
]

export { SLIDE_POSITIONS, TRANSITION_DIRECTIONS }
