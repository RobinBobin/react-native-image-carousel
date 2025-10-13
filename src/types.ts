import type { ViewProps } from 'react-native'
import type { AnimatedProps } from 'react-native-reanimated'
import type { IImageCarouselModelInstance } from './mst'

type TAnimatedViewStyle = AnimatedProps<ViewProps>['style']

type TAxis = 'x' | 'y'

type TTransitionDirection = 'next' | 'previous'
type TSlidePosition = 'current' | TTransitionDirection

type TTransitionPhase = 'neutral' | 'requested' | 'initiated' | 'finished'

type TWithCarouselModel = Readonly<{
  carouselModel: IImageCarouselModelInstance
}>

export type {
  TAnimatedViewStyle,
  TAxis,
  TSlidePosition,
  TTransitionDirection,
  TTransitionPhase,
  TWithCarouselModel
}
