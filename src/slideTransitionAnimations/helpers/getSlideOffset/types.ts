import type { TRCarouselModel, TSlideId } from '../../../mst'
import type { TAxis } from '../../types'

export type TGetSlideOffsetParams = Pick<
  TRCarouselModel,
  'carouselDimensions' | 'slideData'
> &
  Readonly<{
    axis: TAxis
    slideId: TSlideId
  }>
