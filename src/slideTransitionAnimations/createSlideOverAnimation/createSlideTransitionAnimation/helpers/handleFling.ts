import type { TRCarouselModel, TSlideId } from '../../../../mst'
import type {
  ISharedValue,
  THandleFling,
  TRRawSlideTransitionAnimation
} from '../../../types'

import { runOnJS, withTiming } from 'react-native-reanimated'

import { getSlideOffset } from '../../../helpers'

export const handleFling = (
  carouselModel: TRCarouselModel,
  rawAnimation: TRRawSlideTransitionAnimation,
  slideId: TSlideId,
  translateX: ISharedValue<number>
): THandleFling => {
  return ({ flingDirection }) => {
    const { _onFlinged, carouselDimensions, slideData, transitionDirection } =
      carouselModel

    const slideOffset = getSlideOffset({
      axis: 'x',
      carouselDimensions,
      slideData,
      slideId
    })

    const isAnimating = translateX.sharedValue?.get() !== slideOffset
    const isDirectionTheSame = flingDirection === transitionDirection

    if (isAnimating && isDirectionTheSame) {
      _onFlinged(flingDirection)

      return
    }

    translateX.sharedValue?.set(
      withTiming(
        isAnimating ? slideOffset : 0,
        { duration: rawAnimation.duration },
        finished => {
          if (finished ?? true) {
            runOnJS(_onFlinged)(flingDirection)
          }
        }
      )
    )
  }
}
