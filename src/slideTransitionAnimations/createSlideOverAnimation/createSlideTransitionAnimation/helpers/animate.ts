import type {
  ISharedValue,
  TAnimate,
  TRRawSlideTransitionAnimation
} from '../../../types'

import { runOnJS, withDelay, withTiming } from 'react-native-reanimated'

import { getPreTransitionDelay } from '../../../helpers'

export const animate = (
  animation: TRRawSlideTransitionAnimation,
  translateX: ISharedValue<number>
): TAnimate => {
  return ({ isAutoTransitionStarted, onFinished }) => {
    translateX.sharedValue?.set(
      withDelay(
        getPreTransitionDelay(animation, isAutoTransitionStarted),
        withTiming(0, { duration: animation.duration }, finished => {
          if (finished ?? true) {
            runOnJS(onFinished)()
          }
        })
      )
    )
  }
}
