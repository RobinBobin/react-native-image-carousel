import type { SharedValue } from 'react-native-reanimated'

export const verifySharedValue = <T>(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  sharedValue: SharedValue<T> | undefined
): SharedValue<T> => {
  'worklet'

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return sharedValue!
}
