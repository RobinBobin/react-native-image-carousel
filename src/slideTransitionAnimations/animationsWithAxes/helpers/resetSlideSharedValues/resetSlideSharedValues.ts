import type { TAxes } from '../../../../types'
import type { TReset } from './types'

import { SLIDE_POSITIONS } from '../../../../constants'

export const resetSlideSharedValues = (axes: TAxes, reset: TReset): void => {
  SLIDE_POSITIONS.forEach(slidePosition => {
    axes.forEach(axis => {
      reset(axis, slidePosition)
    })
  })
}
