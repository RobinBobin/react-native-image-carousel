import type { StyleProp, ViewStyle } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'
import type { TCarouselDimensions } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'

import { shake } from 'radashi'

export const getContainerStyle = (
  aspectRatio: number,
  carouselDimensions: ReadonlyDeep<TCarouselDimensions> | undefined,
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
