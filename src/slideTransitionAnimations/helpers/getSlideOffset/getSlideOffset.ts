import type { TCarouselDimensionKey } from '../../../mst'
import type { TGetSlideOffsetParams } from './types'

import { verifyNumericCarouselDimensions } from '../../../mst/CarouselModel/helpers'

export const getSlideOffset = ({
  axis,
  carouselDimensions,
  slideData,
  slideId
}: TGetSlideOffsetParams): number => {
  verifyNumericCarouselDimensions(carouselDimensions)

  const [slidePosition] = slideData[slideId]

  if (slidePosition === 'current') {
    return 0
  }

  const dimensionKey: TCarouselDimensionKey = axis === 'x' ? 'width' : 'height'

  const dimension = carouselDimensions[dimensionKey]

  return slidePosition === 'next' ? dimension : -dimension
}
