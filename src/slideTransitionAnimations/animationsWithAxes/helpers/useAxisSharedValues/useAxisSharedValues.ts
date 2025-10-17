import type { TAxisSharedValues, TValue } from '../types'
import type { IUseAxisSharedValuesParams } from './types'

import { useSharedValue } from 'react-native-reanimated'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const useAxisSharedValues = <Value extends TValue = number>({
  axes,
  getInitialValue,
  slidePosition,
  slideSharedValues
}: IUseAxisSharedValuesParams<Value>): TAxisSharedValues<false, Value> => {
  axes.forEach(axis => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const sharedValue = useSharedValue(getInitialValue(axis))

    // The check is to avoid the warning: [Reanimated] Tried to modify key `x` of an object which has been already passed to a worklet.
    if (!slideSharedValues[slidePosition][axis]) {
      slideSharedValues[slidePosition][axis] = sharedValue
    }
  })

  return slideSharedValues[slidePosition] as TAxisSharedValues<false, Value>
}
