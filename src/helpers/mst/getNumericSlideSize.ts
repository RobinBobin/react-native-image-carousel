import type { IImageCarouselModelInstance } from '../../mst'
import type { TCarouselDimensionsKeys } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'
import type { TSlideSize } from '../../mst/types'

import { isNumber } from 'radashi'
import { verify } from 'simple-common-utils'

const keys: Partial<Record<TSlideSize, TCarouselDimensionsKeys>> = {
  carouselHeightSquare: 'height',
  carouselWidthSquare: 'width'
}

export const getNumericSlideSize = (
  carouselModel: IImageCarouselModelInstance
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
