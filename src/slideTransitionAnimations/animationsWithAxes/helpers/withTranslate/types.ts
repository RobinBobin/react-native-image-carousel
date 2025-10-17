import type { SharedValue } from 'react-native-reanimated'
import type { TAxis, TSlidePosition } from '../../../../types'
import type { TWithReturnType } from '../types'

export type TWithTranslateReturnType = TWithReturnType<{
  getTranslate: (
    slidePosition: TSlidePosition,
    axis?: TAxis
  ) => SharedValue<number>
  resetTranslate: () => void
}>
