import type {
  ISharedValue,
  TAnimate,
  TRSlideTransitionAnimation
} from '../../../types'

import { runOnJS, withDelay, withTiming } from 'react-native-reanimated'

import { getPreTransitionDelay } from '../../../helpers'

export const animate = (
  animation: TRSlideTransitionAnimation,
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
