import type { TRCarouselModel, TSlideId } from '../../../../../mst'
import type {
  ISharedValue,
  TCancelInProgressAnimation,
  TRRawSlideTransitionAnimation
} from '../../../../types'

import { runOnJS, withTiming } from 'react-native-reanimated'

import { getSlideOffset } from '../../../../helpers'

export const cancelInProgressAnimation = (
  carouselModel: TRCarouselModel,
  rawAnimation: TRRawSlideTransitionAnimation,
  slideId: TSlideId,
  translateX: ISharedValue<number>
): TCancelInProgressAnimation => {
  return () => {
    // eslint-disable-next-line id-length
    const { _onInProgressAnimationCancelled, carouselDimensions, slideData } =
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
          runOnJS(_onInProgressAnimationCancelled)()
        }
      })
    )
  }
}
