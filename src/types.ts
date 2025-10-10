import type { ViewProps } from 'react-native'
import type { AnimatedProps } from 'react-native-reanimated'
import type { IImageCarouselModelInstance } from './mst'

type TAnimatedViewStyle = AnimatedProps<ViewProps>['style']

type TAxis = 'x' | 'y'

type TImageCarouselSetupCallback = (
  carouselModel: IImageCarouselModelInstance
) => void

type TMovementDirection = 'next' | 'previous'
type TSlidePosition = 'current' | TMovementDirection

type TMovementPhase = 'initiation' | 'finalization'

export type {
  TAnimatedViewStyle,
  TAxis,
  TImageCarouselSetupCallback,
  TMovementDirection,
  TMovementPhase,
  TSlidePosition
}
