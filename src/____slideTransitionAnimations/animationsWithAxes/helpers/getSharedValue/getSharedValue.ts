import type { SharedValue } from 'react-native-reanimated'
import type { TValue } from '../types'
import type { IGetSharedValueParams } from './types'

import { verify } from 'simple-common-utils'

import { getAxis } from '../getAxis'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const getSharedValue = <Value extends TValue = number>({
  axes,
  axis,
  slidePosition,
  slideSharedValues,
  tag
}: IGetSharedValueParams<Value>): SharedValue<Value> => {
  const axisKey = getAxis(axes, axis)

  const sharedValue = slideSharedValues[slidePosition][axisKey]

  verify(
    sharedValue,
    `getSharedValue(${slidePosition}, ${axis}): ${tag} can't be nullish`
  )

  return sharedValue
}
