import type { ViewProps } from 'react-native'
import type { AnimatedProps, SharedValue } from 'react-native-reanimated'
import type { TRCarouselModel, TSlidePosition } from '../../mst'

interface ISharedValue<T> {
  get: () => SharedValue<T>
  sharedValue?: SharedValue<T>
}

type TAnimatedViewStyle = AnimatedProps<ViewProps>['style']
type TAxis = 'x' | 'y'

type TSlideDataAndPosition = Pick<TRCarouselModel, 'slideData'> &
  Readonly<{
    slidePosition: TSlidePosition
  }>

export type { ISharedValue, TAnimatedViewStyle, TAxis, TSlideDataAndPosition }
