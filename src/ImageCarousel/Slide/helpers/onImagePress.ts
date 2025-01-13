import type { IImageCarouselModelInstance } from '../../../mst'
import type { TSlidePosition } from '../../../mst/SwitchAnimationAccessibleImageCarouselModel/types'

export const onImagePress = (
  getImageData: IImageCarouselModelInstance['getImageData'],
  getImageIndex: IImageCarouselModelInstance['getImageIndex'],
  slidePosition: TSlidePosition
): (() => void) => {
  return () => {
    getImageData(slidePosition).onPress?.({
      index: getImageIndex(slidePosition),
      slidePosition
    })
  }
}
