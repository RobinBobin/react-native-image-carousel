import type { SharedValue } from 'react-native-reanimated'
import type { TSlideId } from '../../mst'
import type {
  TAnimate,
  TReset,
  TSlideTransitionAnimation,
  TUseStyle
} from '../types'

import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated'

import { VERY_BIG_NUMBER } from '../constants'
import {
  createSlideTransitionAnimation,
  getPreTransitionDelay,
  getSlideOffset,
  verifySharedValue
} from '../helpers'

export const create = (slideId: TSlideId): TSlideTransitionAnimation => {
  const animation = createSlideTransitionAnimation()

  let translateX: SharedValue<number> | undefined

  const animate: TAnimate = ({
    isAutoTransitionStarted,
    onFinish,
    transitionDirection
  }) => {
    translateX?.set(
      withDelay(
        getPreTransitionDelay(animation, isAutoTransitionStarted),
        withTiming(0, { duration: animation.duration }, finished => {
          if (finished ?? true) {
            runOnJS(onFinish)(transitionDirection)
          }
        })
      )
    )
  }

  const reset: TReset = params => {
    translateX?.set(
      getSlideOffset({
        ...params,
        axis: 'x',
        slideId
      })
    )
  }

  const useStyle: TUseStyle = () => {
    translateX = useSharedValue(slideId === 'slide2' ? 0 : VERY_BIG_NUMBER)

    return useAnimatedStyle(() => {
      const style = {
        transform: [{ translateX: verifySharedValue(translateX).get() }]
      }

      return style
    })
  }

  return Object.assign(animation, { animate, reset, useStyle })
}
