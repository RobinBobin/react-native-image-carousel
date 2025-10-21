import type { TSlideId } from '../../../../mst'
import type {
  ISharedValue,
  THandleFling,
  TRSlideTransitionAnimation
} from '../../../types'

import { runOnJS, withTiming } from 'react-native-reanimated'

import { getSlideOffset } from '../../../helpers'

export const handleFling = (
  animation: TRSlideTransitionAnimation,
  slideId: TSlideId,
  translateX: ISharedValue<number>
): THandleFling => {
  return ({
    carouselDimensions,
    flingDirection,
    onFlinged,
    slideData,
    transitionDirection
  }) => {
    const slideOffset = getSlideOffset({
      axis: 'x',
      carouselDimensions,
      slideData,
      slideId
    })

    const isAnimating = translateX.sharedValue?.get() !== slideOffset
    const isDirectionTheSame = flingDirection === transitionDirection

    if (isAnimating && isDirectionTheSame) {
      onFlinged(flingDirection)

      return
    }

    translateX.sharedValue?.set(
      withTiming(
        isAnimating ? slideOffset : 0,
        { duration: animation.duration },
        finished => {
          if (finished ?? true) {
            runOnJS(onFlinged)(flingDirection)
          }
        }
      )
    )
  }
}
