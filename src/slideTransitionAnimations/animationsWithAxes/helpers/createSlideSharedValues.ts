import type { TAxes } from '../../../types'
import type { TSlideSharedValues, TValue } from './types'

import { objectify } from 'radashi'

import { SLIDE_DATA_SOURCES, SLIDE_POSITIONS } from '../../../constants'

export const createSlideSharedValues = <Value extends TValue = number>(
  axes: TAxes
): TSlideSharedValues<true, Value> => {
  return objectify(
    SLIDE_DATA_SOURCES,
    slideDataSource => slideDataSource,
    () =>
      objectify(
        SLIDE_POSITIONS,
        slidePosition => slidePosition,
        () =>
          objectify(
            axes,
            axis => axis,
            () => undefined
          )
      )
  )
}
