import type { ReadonlyDeep } from 'type-fest'
import type { ICarouselNumberDimensions, TCarouselDimensions } from '../types'

import { isNumber } from 'radashi'

// eslint-disable-next-line id-length
export const areCarouselNumberDimensionsReady = (
  carouselDimensions: ReadonlyDeep<TCarouselDimensions> | undefined
): carouselDimensions is ICarouselNumberDimensions => {
  const isPositiveNumber = (dimension: unknown): dimension is number => {
    return isNumber(dimension) && dimension > 0
  }

  const values = Object.values(carouselDimensions ?? {})

  return Boolean(values.length) && values.every(isPositiveNumber)
}
