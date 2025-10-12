import type { TImageRawData } from '../../../../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'
import type { TWithCarouselModel } from '../../../../../types'
import type { TImageCarouselSetupCallback } from '../types'

type TUseSetImageDataParamsBase = Readonly<{
  imageData: TImageRawData
  onPostSetImageData?: TImageCarouselSetupCallback
  onPreSetImageData?: TImageCarouselSetupCallback
}>

type TUseSetImageDataParams = TUseSetImageDataParamsBase & TWithCarouselModel

export type { TUseSetImageDataParams, TUseSetImageDataParamsBase }
