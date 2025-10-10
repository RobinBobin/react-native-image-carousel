import type { IImageCarouselModelInstance } from '../../../../mst'
import type { TImageRawData } from '../../../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'
import type { TImageCarouselSetupCallback } from '../../../../types'

import { useCarouselModel } from './useCarouselModel'
import { useSetImageData } from './useSetImageData'

export const useImageCarouselModel = (
  imageData: TImageRawData,
  postSetImageDataSetupCallback?: TImageCarouselSetupCallback,
  preSetImageDataSetupCallback?: TImageCarouselSetupCallback
): IImageCarouselModelInstance => {
  const carouselModel = useCarouselModel(preSetImageDataSetupCallback)

  useSetImageData(carouselModel, imageData, postSetImageDataSetupCallback)

  return carouselModel
}
