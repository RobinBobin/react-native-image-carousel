import type { SharedValue } from 'react-native-reanimated'
import type { TSlideId } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'
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
  getPreTransitionDelay
} from '../helpers'

export const create = (slideId: TSlideId): TSlideTransitionAnimation => {
  const animation = createSlideTransitionAnimation()

  let translateX: SharedValue<number> | undefined

  const animate: TAnimate = ({
    isAutoTransitionStarted,
    onCancel,
    onFinish
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    translateX!.value = withDelay(
      getPreTransitionDelay(animation, isAutoTransitionStarted),
      withTiming(
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        0,
        { duration: animation.duration },
        finished => {
          if (finished ?? true) {
            runOnJS(onFinish)()
          } else if (onCancel) {
            runOnJS(onCancel)()
          }
        }
      )
    )
  }

  const reset: TReset = values => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    translateX!.value = values[slideId]
  }

  const useStyle: TUseStyle = () => {
    translateX = useSharedValue(VERY_BIG_NUMBER)

    return useAnimatedStyle(() => {
      const style = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        transform: [{ translateX: translateX!.value }]
      }

      console.log(slideId, 'style', style)

      return style
    })
  }

  return {
    ...animation,
    animate,
    outputTranslate(): void {
      console.log('outputTranslate()', slideId, translateX?.value)
    },
    reset,
    useStyle
  }
}
