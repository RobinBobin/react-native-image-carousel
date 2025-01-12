import type { IImageCarouselModelInstance } from '../../../mst'
import type { ImageCarousel } from '../..'
import type { IImageCarouselProps } from '../../types'

export type TUseImageCarouselReturnType = Readonly<{
  carousel: React.ReactElement<IImageCarouselProps, typeof ImageCarousel>
  carouselModel: IImageCarouselModelInstance
}>
