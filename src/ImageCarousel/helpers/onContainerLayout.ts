import type { ImageProps } from 'react-native'
import type { IImageCarouselModelInstance } from '../../mst'

export const onContainerLayout = (
  setCarouselDimensions: IImageCarouselModelInstance['setCarouselDimensions']
): ImageProps['onLayout'] => {
  return ({ nativeEvent: { layout } }) => setCarouselDimensions(layout)
}
