import type { TRCarouselModel, TSlideId } from '../../../../mst'
import type { ISharedValue, TPrepare } from '../../../types'

import { getSlideOffset } from '../../../helpers'

export const prepare = (
  carouselModel: TRCarouselModel,
  slideId: TSlideId,
  translateX: ISharedValue<number>
): TPrepare => {
  return () => {
    const { carouselDimensions, slideData } = carouselModel

    translateX.sharedValue?.set(
      getSlideOffset({
        axis: 'x',
        carouselDimensions,
        slideData,
        slideId
      })
    )
  }
}
