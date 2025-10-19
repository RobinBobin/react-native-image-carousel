import type { TSlideId, TSlidePosition, TTransitionDirection } from './types'

// The order **matters** (CarouselModel._finishTransition()).
const SLIDE_IDS: readonly TSlideId[] = ['slide1', 'slide2', 'slide3']

// The order **matters** (CarouselModel._finishTransition()).
const SLIDE_POSITIONS: readonly TSlidePosition[] = [
  'previous',
  'current',
  'next'
]

// The order **does not** matter.
const TRANSITION_DIRECTIONS: readonly TTransitionDirection[] = [
  'next',
  'previous'
]

export { SLIDE_IDS, SLIDE_POSITIONS, TRANSITION_DIRECTIONS }
