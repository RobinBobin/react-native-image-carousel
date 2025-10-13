import type { IImageCarouselModelInstance } from '../../../../mst'
import type { TTransitionDirection } from '../../../../types'
import type { IPoint, TUseGestureReturnType } from './types'

import { Directions, Gesture } from 'react-native-gesture-handler'
import { runOnJS, useSharedValue } from 'react-native-reanimated'

export const useGesture = ({
  slideTransitionAnimation,
  transitionPhase
}: IImageCarouselModelInstance): TUseGestureReturnType => {
  const initialCoords = useSharedValue<IPoint | undefined>(undefined)

  const handleFling = (direction: TTransitionDirection): void => {
    slideTransitionAnimation.handleFling(direction)
  }

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
        if (initialCoords.value && transitionPhase === 'initiated') {
          const direction: TTransitionDirection =
            event.x > initialCoords.value.x ? 'previous' : 'next'

          runOnJS(handleFling)(direction)
        } else {
          console.log("Won't handle fling")
        }
      })
  )
}
