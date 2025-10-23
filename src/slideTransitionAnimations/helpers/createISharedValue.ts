import type { SharedValue } from 'react-native-reanimated'
import type { ISharedValue } from '../types'

export const createISharedValue = <T>(): ISharedValue<T> => ({
  get(): SharedValue<T> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.sharedValue!
  }
})
