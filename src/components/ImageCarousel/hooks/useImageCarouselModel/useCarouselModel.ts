import type { IImageCarouselModelInstance } from '../../../../mst'
import type { TImageCarouselSetupCallback } from '../../../../types'

import { useMemo } from 'react'

import { ImageCarouselModel } from '../../../../mst'

export const useCarouselModel = (
  preSetImageDataSetupCallback?: TImageCarouselSetupCallback
): IImageCarouselModelInstance => {
  return useMemo(() => {
    const carouselModel = ImageCarouselModel.create()

    preSetImageDataSetupCallback?.(carouselModel)

    return carouselModel
  }, [preSetImageDataSetupCallback])
}
