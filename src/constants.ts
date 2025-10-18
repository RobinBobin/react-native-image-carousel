import type { TSlideId } from './mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'
import type { TSlidePosition, TTransitionDirection } from './types'

// The order **matters** (SlideTransitionAnimationAccessibleImageCarouselModel.finishTransition()).
const SLIDE_IDS: readonly TSlideId[] = ['slide1', 'slide2', 'slide3']

// The order **matters** (SlideTransitionAnimationAccessibleImageCarouselModel.finishTransition()).
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
