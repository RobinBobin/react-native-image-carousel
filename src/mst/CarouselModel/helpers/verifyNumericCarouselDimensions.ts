import type { TNumericCarouselDimensions, TRCarouselDimensions } from '../types'

import { verify } from 'simple-common-utils'

import { isNumericHeightAndWidth } from './isNumericHeightAndWidth'

// eslint-disable-next-line id-length
export function verifyNumericCarouselDimensions(
  carouselDimensions: TRCarouselDimensions
): asserts carouselDimensions is TNumericCarouselDimensions {
  verify(
    isNumericHeightAndWidth(carouselDimensions),
    "'carouselDimensions' can't be nullish and must have both 'height' and 'width'"
  )
}
