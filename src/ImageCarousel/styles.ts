import type { StyleProp, ViewStyle } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'
import type { TCarouselDimensions } from '../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'

import { shake } from 'radashi'

export const getContainerStyle = (
  aspectRatio: number,
  carouselDimensions?: ReadonlyDeep<TCarouselDimensions>
): StyleProp<ViewStyle> => [
  {
    aspectRatio,
    overflow: 'hidden'
  },
  shake(carouselDimensions ?? {})
]
