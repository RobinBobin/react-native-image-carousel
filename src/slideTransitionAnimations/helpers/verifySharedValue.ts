import type { SharedValue } from 'react-native-reanimated'

import { verify } from 'simple-common-utils'

export const verifySharedValue = <T>(
  hint: string,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  sharedValue: SharedValue<T> | undefined
): SharedValue<T> => {
  verify(
    sharedValue,
    `'getSharedValue(${hint})': 'sharedValue' can't be nullish`
  )

  return sharedValue
}
