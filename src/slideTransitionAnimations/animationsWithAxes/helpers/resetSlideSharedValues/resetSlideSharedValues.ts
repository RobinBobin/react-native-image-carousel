import type { TAxes } from '../../../../types'
import type { TReset } from './types'

import { SLIDE_DATA_SOURCES, SLIDE_POSITIONS } from '../../../../constants'

export const resetSlideSharedValues = (axes: TAxes, reset: TReset): void => {
  SLIDE_DATA_SOURCES.forEach(slideDataSource => {
    SLIDE_POSITIONS.forEach(slidePosition => {
      axes.forEach(axis => {
        reset(axis, slideDataSource, slidePosition)
      })
    })
  })
}
