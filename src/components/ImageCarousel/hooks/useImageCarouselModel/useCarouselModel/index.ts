import type { ICarouselModelInstance } from '../../../../../mst'
import type { TUseCarouselModelParams } from './types'

import { useMemo } from 'react'

import { CarouselModelImpl } from '../../../../../mst'

export const useCarouselModel = ({
  onPostCreateModel,
  onPreCreateModel
}: TUseCarouselModelParams): ICarouselModelInstance => {
  return useMemo(() => {
    onPreCreateModel?.()

    const carouselModel = CarouselModelImpl.create()

    onPostCreateModel?.(carouselModel)

    return carouselModel
  }, [onPostCreateModel, onPreCreateModel])
}
