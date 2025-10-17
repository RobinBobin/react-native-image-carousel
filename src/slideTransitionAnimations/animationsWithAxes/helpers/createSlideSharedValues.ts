import type { TAxes } from '../../../types'
import type { TSlideSharedValues, TValue } from './types'

import { objectify } from 'radashi'

export const createSlideSharedValues = <Value extends TValue = number>(
  axes: TAxes
): TSlideSharedValues<true, Value> => {
  const axisSharedValues = objectify(
    axes,
    axis => axis,
    () => undefined
  )

  return {
    current: { ...axisSharedValues },
    next: { ...axisSharedValues },
    previous: { ...axisSharedValues }
  }
}
