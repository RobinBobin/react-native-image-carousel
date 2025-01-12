import type { StyleProp } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { IImageCarouselModelInstance } from '../../mst'

import { sleep } from 'radashi'
import { useEffect } from 'react'
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

export const useAutoscrollAnimation = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  {
    autoscrollAnimationParams: { delay, duration },
    carouselWidth,
    isAutoscrollEnabled,
    move
  }: IImageCarouselModelInstance
): StyleProp<AnimatedStyle> => {
  const imageTranslateX = useSharedValue(0)

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: imageTranslateX.value }]
  }))

  useEffect(() => {
    const minTranslateX = 0

    const rerun = async (shouldMoveNext = true): Promise<void> => {
      if (shouldMoveNext) {
        await sleep(delay)

        move('next')
      }

      imageTranslateX.value = carouselWidth

      if (!shouldMoveNext) {
        await sleep(delay)
      }

      imageTranslateX.value = withTiming(minTranslateX, { duration }, () => {
        runOnJS(rerun)()
      })
    }

    if (carouselWidth && isAutoscrollEnabled) {
      void rerun(false)
    }
  }, [
    carouselWidth,
    delay,
    duration,
    imageTranslateX,
    isAutoscrollEnabled,
    move
  ])

  return imageStyle
}
