import type { TSlideDataSource } from './mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'
import type { TSlidePosition, TTransitionDirection } from './types'

const SLIDE_DATA_SOURCES: readonly TSlideDataSource[] = ['primary', 'secondary']

const SLIDE_POSITIONS: readonly TSlidePosition[] = [
  'current',
  'next',
  'previous'
]

const TRANSITION_DIRECTIONS: readonly TTransitionDirection[] = [
  'next',
  'previous'
]

export { SLIDE_DATA_SOURCES, SLIDE_POSITIONS, TRANSITION_DIRECTIONS }
