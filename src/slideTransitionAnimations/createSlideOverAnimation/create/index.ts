import type { TSlideId } from '../../../mst'
import type { ISharedValue, TSlideTransitionAnimation } from '../../types'

import { createSlideTransitionAnimation } from '../../helpers'
import { animate, handleFling, prepare, useStyle } from './helpers'

export const create = (slideId: TSlideId): TSlideTransitionAnimation => {
  const animation = createSlideTransitionAnimation()

  const translateX: ISharedValue<number> = {}

  return Object.assign(animation, {
    animate: animate(animation, translateX),
    handleFling: handleFling(animation, slideId, translateX),
    prepare: prepare(slideId, translateX),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useStyle: useStyle(slideId, translateX)
  })
}
