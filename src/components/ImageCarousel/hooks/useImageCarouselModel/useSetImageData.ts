import type { IImageCarouselModelInstance } from '../../../../mst'
import type { TImageRawData } from '../../../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'
import type { TImageCarouselSetupCallback } from './types'

import useAsync from 'react-use/lib/useAsync'

export const useSetImageData = (
  carouselModel: IImageCarouselModelInstance,
  imageData: TImageRawData,
  postSetImageDataSetupCallback?: TImageCarouselSetupCallback
): void => {
  useAsync(async (): Promise<void> => {
    if (imageData.length) {
      await carouselModel.setImageData(imageData)

      postSetImageDataSetupCallback?.(carouselModel)
    }
  }, [carouselModel, imageData, postSetImageDataSetupCallback])
}
