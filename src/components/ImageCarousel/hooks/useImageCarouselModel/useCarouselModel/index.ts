import type { IImageCarouselModelInstance } from '../../../../../mst'
import type { TUseCarouselModelParams } from './types'

import { useMemo } from 'react'

import { ImageCarouselModel } from '../../../../../mst'

export const useCarouselModel = ({
  onPostCreateModel,
  onPreCreateModel
}: TUseCarouselModelParams): IImageCarouselModelInstance => {
  return useMemo(() => {
    onPreCreateModel?.()

    const carouselModel = ImageCarouselModel.create()

    onPostCreateModel?.(carouselModel)

    return carouselModel
  }, [onPostCreateModel, onPreCreateModel])
}
