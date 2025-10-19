import type { StyleProp, ViewStyle } from 'react-native'
import type { TRCarouselDimensions } from '../../mst'

import { shake } from 'radashi'

export const getContainerStyle = (
  aspectRatio: number,
  carouselDimensions: TRCarouselDimensions,
  style: StyleProp<ViewStyle>
): StyleProp<ViewStyle> => {
  const shakenCarouselDimensions = shake(carouselDimensions ?? {})

  const isDimensionMissing =
    !('height' in shakenCarouselDimensions) ||
    !('width' in shakenCarouselDimensions)

  return [
    {
      overflow: 'hidden'
    },
    style,
    isDimensionMissing && { aspectRatio },
    shakenCarouselDimensions
  ]
}
