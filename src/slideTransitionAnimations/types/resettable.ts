import type { TSlideId } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'

type TReset = (values: Readonly<Record<TSlideId, number>>) => void

interface IResettable {
  reset: TReset
}

export type { IResettable, TReset }
