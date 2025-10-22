import type { TSlideId } from '../../../../mst'
import type { ISharedValue, TPrepare } from '../../../types'

import { getSlideOffset } from '../../../helpers'

export const prepare = (
  slideId: TSlideId,
  translateX: ISharedValue<number>
): TPrepare => {
  return params => {
    translateX.sharedValue?.set(
      getSlideOffset({
        ...params,
        axis: 'x',
        slideId
      })
    )
  }
}
