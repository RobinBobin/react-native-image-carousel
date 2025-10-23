import type { TRCarouselModel, TSlideId } from '../../../../../mst'
import type { IIsAnimationInProgress, ISharedValue } from '../../../../types'

import { getSlideOffset } from '../../../../helpers'

export const isAnimationInProgress = (
  carouselModel: TRCarouselModel,
  slideId: TSlideId,
  translateX: ISharedValue<number>
): IIsAnimationInProgress => ({
  get isAnimationInProgress(): boolean {
    const { carouselDimensions, slideData } = carouselModel

    const slideOffset = getSlideOffset({
      axis: 'x',
      carouselDimensions,
      slideData,
      slideId
    })

    return translateX.sharedValue?.get() !== slideOffset
  }
})
