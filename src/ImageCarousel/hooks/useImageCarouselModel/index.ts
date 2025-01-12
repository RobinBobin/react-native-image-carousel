import type { ReadonlyDeep } from 'type-fest'
import type { IImageCarouselModelInstance } from '../../../mst'
import type { TImageRawData } from '../../../mst/types'

import { useMemo } from 'react'
import useAsync from 'react-use/lib/useAsync'

import { ImageCarouselModel } from '../../../mst'

export const useImageCarouselModel = (
  imageData: ReadonlyDeep<TImageRawData>
): IImageCarouselModelInstance => {
  const carouselModel = useMemo(() => ImageCarouselModel.create(), [])

  useAsync(async (): Promise<void> => {
    if (imageData.length) {
      await carouselModel.setImageData(imageData)
    }
  }, [carouselModel, imageData])

  return carouselModel
}
