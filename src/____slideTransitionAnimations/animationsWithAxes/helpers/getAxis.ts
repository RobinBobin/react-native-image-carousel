import type { TAxes, TAxis } from '../../../types'

import { verify } from 'simple-common-utils'

export const getAxis = (axes: TAxes, axis?: TAxis): TAxis => {
  if (axis) {
    return axis
  }

  const tag = `getAxis(${axes.join(',')}, ${axis})`
  const [axis1, axis2] = axes

  verify(axis1, `${tag}: no axis specified`)
  verify(!axis2, `${tag}: 'axis' can't be omitted if both axes are used`)

  return axis1
}
