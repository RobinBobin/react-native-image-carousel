import type { ImageProps } from 'react-native'
import type { IImageCarouselModelInstance } from '../../mst'

import { pick } from 'radashi'

export const onContainerLayout = (
  setCarouselDimensions: IImageCarouselModelInstance['setCarouselDimensions']
): ImageProps['onLayout'] => {
  return ({ nativeEvent: { layout } }) =>
    setCarouselDimensions(pick(layout, ['width', 'height']))
}
