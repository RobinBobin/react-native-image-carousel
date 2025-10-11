import type { ViewProps } from 'react-native'
import type { AnimatedProps } from 'react-native-reanimated'

type TAnimatedViewStyle = AnimatedProps<ViewProps>['style']

type TAxis = 'x' | 'y'

type TTransitionDirection = 'next' | 'previous'
type TSlidePosition = 'current' | TTransitionDirection

type TTransitionPhase = 'initiation' | 'finalization'

export type {
  TAnimatedViewStyle,
  TAxis,
  TSlidePosition,
  TTransitionDirection,
  TTransitionPhase
}
