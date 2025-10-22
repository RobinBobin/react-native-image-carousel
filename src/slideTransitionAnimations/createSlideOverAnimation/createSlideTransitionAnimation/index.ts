import type { TSlideId } from '../../../mst'
import type { ISharedValue, TSlideTransitionAnimation } from '../../types'

import { createRawSlideTransitionAnimation } from '../../helpers'
import { animate, handleFling, prepare, useStyle } from './helpers'

export const createSlideTransitionAnimation = (
  slideId: TSlideId
): TSlideTransitionAnimation => {
  const rawAnimation = createRawSlideTransitionAnimation()

  const translateX: ISharedValue<number> = {}

  return {
    ...rawAnimation,
    animate: animate(rawAnimation, translateX),
    handleFling: handleFling(rawAnimation, slideId, translateX),
    prepare: prepare(slideId, translateX),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useStyle: useStyle(slideId, translateX)
  }
}
