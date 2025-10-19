import type { TRawImageData, TWithCarouselModel } from '../../../../../mst'
import type { TImageCarouselSetupCallback } from '../types'

type TUseSetImageDataParamsBase = Readonly<{
  imageData: TRawImageData
  onPostSetImageData?: TImageCarouselSetupCallback
  onPreSetImageData?: TImageCarouselSetupCallback
}>

type TUseSetImageDataParams = TUseSetImageDataParamsBase & TWithCarouselModel

export type { TUseSetImageDataParams, TUseSetImageDataParamsBase }
