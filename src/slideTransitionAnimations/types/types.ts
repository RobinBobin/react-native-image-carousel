import type { ViewProps } from 'react-native'
import type { AnimatedProps, SharedValue } from 'react-native-reanimated'
import type { TRCarouselModel } from '../../mst'

interface ISharedValue<T> {
  get: () => SharedValue<T>
  sharedValue?: SharedValue<T>
}

type TAnimatedViewStyle = AnimatedProps<ViewProps>['style']
type TAxis = 'x' | 'y'

type TSlideDataAndTransitionDirection = Pick<
  TRCarouselModel,
  'slideData' | 'transitionDirection'
>

export type {
  ISharedValue,
  TAnimatedViewStyle,
  TAxis,
  TSlideDataAndTransitionDirection
}
