import type {
  ICarouselModelInstance,
  TWithCarouselModel
} from '../../../../mst'
import type { TUseCarouselModelParams } from './useCarouselModel/types'
import type { TUseSetImageDataParamsBase } from './useSetImageData/types'

type TImageCarouselSetupCallback = (
  carouselModel: ICarouselModelInstance
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
