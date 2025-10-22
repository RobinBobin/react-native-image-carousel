import type { TRCarouselModel } from '../../../../mst'
import type {
  ISharedValue,
  TAnimate,
  TRRawSlideTransitionAnimation
} from '../../../types'

import { runOnJS, withDelay, withTiming } from 'react-native-reanimated'

import { getPreTransitionDelay } from '../../../helpers'

export const animate = (
  carouselModel: TRCarouselModel,
  rawAnimation: TRRawSlideTransitionAnimation,
  translateX: ISharedValue<number>
): TAnimate => {
  return () => {
    const { isAutoTransitionStarted, _onFinished } = carouselModel

    translateX.sharedValue?.set(
      withDelay(
        getPreTransitionDelay(rawAnimation, isAutoTransitionStarted),
        withTiming(0, { duration: rawAnimation.duration }, finished => {
          if (finished ?? true) {
            runOnJS(_onFinished)()
          }
        })
      )
    )
  }
}
