import type { FlingGesture } from 'react-native-gesture-handler'
import type {
  ICarouselModelInstance,
  TTransitionDirection
} from '../../../../mst'
import type { IPoint } from './types'

import { Directions, Gesture } from 'react-native-gesture-handler'
import { runOnJS, useSharedValue } from 'react-native-reanimated'

export const useFlingGesture = (
  carouselModel: ICarouselModelInstance
): FlingGesture => {
  const initialCoords = useSharedValue<IPoint | undefined>(undefined)

  return (
    // eslint-disable-next-line new-cap
    Gesture.Fling()
      // eslint-disable-next-line no-bitwise
      .direction(Directions.LEFT | Directions.RIGHT)
      .onBegin(event => {
        // eslint-disable-next-line id-length
        initialCoords.value = { x: event.x, y: event.y }
      })
      .onEnd(event => {
        if (initialCoords.value) {
          const direction: TTransitionDirection =
            event.x > initialCoords.value.x ? 'previous' : 'next'

          runOnJS(carouselModel._handleFling)(direction)
        }
      })
  )
}
