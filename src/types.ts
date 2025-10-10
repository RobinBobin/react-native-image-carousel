import type { ViewProps } from 'react-native'
import type { AnimatedProps } from 'react-native-reanimated'

type TAnimatedViewStyle = AnimatedProps<ViewProps>['style']

type TAxis = 'x' | 'y'

type TMovementDirection = 'next' | 'previous'
type TSlidePosition = 'current' | TMovementDirection

type TMovementPhase = 'initiation' | 'finalization'

export type {
  TAnimatedViewStyle,
  TAxis,
  TMovementDirection,
  TMovementPhase,
  TSlidePosition
}
