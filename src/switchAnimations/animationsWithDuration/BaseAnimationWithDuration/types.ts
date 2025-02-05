import type { StyleProp } from 'react-native'
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated'
import type { TAxis, TSlidePosition } from '../../../types'

interface IAxisAnimationData {
  animatedStyle: StyleProp<AnimatedStyle>
  translate: SharedValue<number>
}

type TAxisAnimationDatum = Partial<
  Record<TAxis, IAxisAnimationData | undefined>
>

type TAxisAnimationData = Record<TSlidePosition, TAxisAnimationDatum>

export type { TAxisAnimationData }
