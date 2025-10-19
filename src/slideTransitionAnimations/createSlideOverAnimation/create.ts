import type { SharedValue } from 'react-native-reanimated'
import type { TSlideId } from '../../mst'
import type {
  TAnimate,
  TReset,
  TSlideTransitionAnimation,
  TUseStyle
} from '../types'

import { partial } from 'radashi'
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

  const verifyTranslateX = partial(verifySharedValue<number>, 'translateX')

  const animate: TAnimate = ({
    isAutoTransitionStarted,
    onCancel,
    onFinish
  }) => {
    verifyTranslateX(translateX).value = withDelay(
      getPreTransitionDelay(animation, isAutoTransitionStarted),
      withTiming(0, { duration: animation.duration }, finished => {
        if (finished ?? true) {
          runOnJS(onFinish)()
        } else if (onCancel) {
          runOnJS(onCancel)()
        }
      })
    )
  }

  const reset: TReset = params => {
    verifyTranslateX(translateX).value = getSlideOffset({
      ...params,
      axis: 'x',
      slideId
    })
  }

  const useStyle: TUseStyle = () => {
    translateX = useSharedValue(slideId === 'slide2' ? 0 : VERY_BIG_NUMBER)

    return useAnimatedStyle(() => {
      const style = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        transform: [{ translateX: translateX!.value }]
      }

      return style
    })
  }

  return {
    ...animation,
    animate,
    reset,
    useStyle
  }
}
