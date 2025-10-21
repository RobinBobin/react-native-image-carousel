import type { ViewProps } from 'react-native'
import type { AnimatedProps, SharedValue } from 'react-native-reanimated'
import type { ICarouselModelVolatile } from '../../mst'

interface ISharedValue<T> {
  sharedValue?: SharedValue<T>
}

type TAnimatedViewStyle = AnimatedProps<ViewProps>['style']
type TAxis = 'x' | 'y'

type TSlideDataAndTransitionDirection = Readonly<
  Pick<ICarouselModelVolatile, 'slideData' | 'transitionDirection'>
>

export type {
  ISharedValue,
  TAnimatedViewStyle,
  TAxis,
  TSlideDataAndTransitionDirection
}
