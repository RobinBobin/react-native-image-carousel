import type { ICarouselModelInstance } from '../../../../mst'
import type { TUseImageCarouselModelParams } from './types'

import { pick } from 'radashi'

import { useCarouselModel } from './useCarouselModel'
import { useSetImageData } from './useSetImageData'

export const useImageCarouselModel = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  params: TUseImageCarouselModelParams
): ICarouselModelInstance => {
  const carouselModel = useCarouselModel(
    pick(params, ['onPostCreateModel', 'onPreCreateModel'])
  )

  useSetImageData({
    carouselModel,
    ...pick(params, ['imageData', 'onPostSetImageData', 'onPreSetImageData'])
  })

  return carouselModel
}
