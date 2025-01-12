import type { ImageProps } from 'react-native'
import type { IImageCarouselModelInstance } from '../../mst'

export const onContainerLayout = (
  setCarouselWidth: IImageCarouselModelInstance['setCarouselWidth']
): ImageProps['onLayout'] => {
  return ({ nativeEvent: { layout } }) => {
    setCarouselWidth(layout.width)
  }
}
