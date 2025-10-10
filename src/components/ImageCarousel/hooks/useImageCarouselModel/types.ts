import type { IImageCarouselModelInstance } from '../../../../mst'
import type { IComponentWithCarouselModelProps } from '../../../common/types'

type TImageCarouselSetupCallback = (
  carouselModel: IImageCarouselModelInstance
) => void

type TUseImageCarouselReturnType = Readonly<
  IComponentWithCarouselModelProps & {
    carousel: React.ReactElement
  }
>

export type { TImageCarouselSetupCallback, TUseImageCarouselReturnType }
