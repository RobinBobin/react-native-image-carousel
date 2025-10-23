import type { TRCarouselModel, TSlideId } from '../../../../../mst'
import type {
  ISharedValue,
  TCancelCurrentAnimation,
  TRRawSlideTransitionAnimation
} from '../../../../types'

import { runOnJS, withTiming } from 'react-native-reanimated'

import { getSlideOffset } from '../../../../helpers'

export const cancelCurrentAnimation = (
  carouselModel: TRCarouselModel,
  rawAnimation: TRRawSlideTransitionAnimation,
  slideId: TSlideId,
  translateX: ISharedValue<number>
): TCancelCurrentAnimation => {
  return () => {
    const { _onCurrentAnimationCancelled, carouselDimensions, slideData } =
      carouselModel

    const slideOffset = getSlideOffset({
      axis: 'x',
      carouselDimensions,
      slideData,
      slideId
    })

    translateX.sharedValue?.set(
      withTiming(slideOffset, { duration: rawAnimation.duration }, finished => {
        if (finished ?? true) {
          runOnJS(_onCurrentAnimationCancelled)()
        }
      })
    )
  }
}
