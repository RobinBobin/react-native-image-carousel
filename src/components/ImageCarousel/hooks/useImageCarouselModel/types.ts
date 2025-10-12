import type { IImageCarouselModelInstance } from '../../../../mst'
import type { TWithCarouselModel } from '../../../../types'
import type { TUseCarouselModelParams } from './useCarouselModel/types'
import type { TUseSetImageDataParamsBase } from './useSetImageData/types'

type TImageCarouselSetupCallback = (
  carouselModel: IImageCarouselModelInstance
) => void

type TUseImageCarouselModelParams = TUseCarouselModelParams &
  TUseSetImageDataParamsBase

type TUseImageCarouselReturnType = TWithCarouselModel &
  Readonly<{
    carousel: React.ReactElement
  }>

export type {
  TImageCarouselSetupCallback,
  TUseImageCarouselModelParams,
  TUseImageCarouselReturnType
}
