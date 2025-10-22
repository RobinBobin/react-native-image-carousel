import type { TRCarouselModelVolatileBase, TSlideId } from '../../../mst'
import type { ISharedValue, TSlideTransitionAnimation } from '../../types'

import { combine, createRawSlideTransitionAnimation } from '../../helpers'
import {
  _useStyle,
  animate,
  handleFling,
  isAnimationInProgress,
  prepare
} from './helpers'

export const createSlideTransitionAnimation = (
  base: TRCarouselModelVolatileBase,
  slideId: TSlideId
): TSlideTransitionAnimation => {
  const rawAnimation = createRawSlideTransitionAnimation()
  const translateX: ISharedValue<number> = {}

  return combine(combine(rawAnimation, isAnimationInProgress(base)), {
    animate: animate(rawAnimation, translateX),
    handleFling: handleFling(rawAnimation, slideId, translateX),
    prepare: prepare(slideId, translateX),
    useStyle: _useStyle(slideId, translateX)
  })
}
