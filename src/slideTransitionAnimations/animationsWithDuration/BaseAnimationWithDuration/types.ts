import type { SharedValue } from 'react-native-reanimated'
import type { TAnimatedViewStyle, TAxis, TSlidePosition } from '../../../types'

interface IAxisAnimationData {
  animatedStyle: TAnimatedViewStyle
  translate: SharedValue<number>
}

type TAxisAnimationDatum = Partial<
  Record<TAxis, IAxisAnimationData | undefined>
>

type TAxisAnimationData = Record<TSlidePosition, TAxisAnimationDatum>

export type { TAxisAnimationData }
