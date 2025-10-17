import type { TSlideDataSource } from '../../../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'
import type { TAxis, TSlidePosition } from '../../../../types'

type TReset = (
  axis: TAxis,
  slideDataSource: TSlideDataSource,
  slidePosition: TSlidePosition
) => void
type TResetSlideSharedValues = () => void

export type { TReset, TResetSlideSharedValues }
