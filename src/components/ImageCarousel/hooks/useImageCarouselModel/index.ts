import type { IImageCarouselModelInstance } from '../../../../mst'
import type { TUseImageCarouselModelParams } from './types'

import { pick } from 'radashi'

import { useCarouselModel } from './useCarouselModel'
import { useSetImageData } from './useSetImageData'

export const useImageCarouselModel = (
  params: TUseImageCarouselModelParams
): IImageCarouselModelInstance => {
  const carouselModel = useCarouselModel(
    pick(params, ['onPostCreateModel', 'onPreCreateModel'])
  )

  useSetImageData({
    carouselModel,
    ...pick(params, ['imageData', 'onPostSetImageData', 'onPreSetImageData'])
  })

  return carouselModel
}
