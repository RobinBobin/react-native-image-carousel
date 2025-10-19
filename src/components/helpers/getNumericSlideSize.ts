import type {
  ICarouselModelInstance,
  TCarouselDimensionKey,
  TSlideSize
} from '../../mst'

import { isNumber } from 'radashi'
import { verify } from 'simple-common-utils'

const keys: Partial<Record<TSlideSize, TCarouselDimensionKey>> = {
  carouselHeightSquare: 'height',
  carouselWidthSquare: 'width'
}

export const getNumericSlideSize = (
  carouselModel: ICarouselModelInstance
): number => {
  const { carouselDimensions, slideSize } = carouselModel

  const key = keys[slideSize]

  verify(
    key,
    `'getNumericSlideSize()': unsupported 'slideSize': '${slideSize}'`
  )

  const numericSlideSize = carouselDimensions?.[key]

  verify(
    isNumber(numericSlideSize),
    `'getNumericSlideSize()': 'numericSlideSize' is '${typeof numericSlideSize}', but must be a number`
  )

  return numericSlideSize
}
