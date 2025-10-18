import type { TSlideId } from '../../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'
import type { TSlidePosition, TWithCarouselModel } from '../../../types'

export interface ISlideImagePropsBase extends TWithCarouselModel {
  position?: TSlidePosition
  slideId?: TSlideId
}
