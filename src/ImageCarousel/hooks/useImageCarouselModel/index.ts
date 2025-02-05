import type { IImageCarouselModelInstance } from '../../../mst'
import type { TImageRawData } from '../../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'

import { useMemo } from 'react'
import useAsync from 'react-use/lib/useAsync'

import { ImageCarouselModel } from '../../../mst'

export const useImageCarouselModel = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  imageData: TImageRawData
): IImageCarouselModelInstance => {
  const carouselModel = useMemo(() => ImageCarouselModel.create(), [])

  useAsync(async (): Promise<void> => {
    await carouselModel.setImageData(imageData)
  }, [carouselModel, imageData])

  return carouselModel
}
