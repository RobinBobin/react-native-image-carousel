import type { TRCarouselModel, TSlideId } from '../../../../../mst'
import type { ISharedValue, TUseStyle } from '../../../../types'

import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import { VERY_BIG_NUMBER } from '../../../../constants'

export const _useStyle = (
  carouselModel: TRCarouselModel,
  slideId: TSlideId,
  translateX: ISharedValue<number>
): TUseStyle => {
  return () => {
    const slidePosition = carouselModel.slideData[slideId][0]

    const _translateX = useSharedValue(
      slideId === 'slide2' ? 0 : VERY_BIG_NUMBER
    )

    translateX.sharedValue = _translateX

    return useAnimatedStyle(() => {
      const style = {
        transform: [{ translateX: _translateX.get() }],
        zIndex: slidePosition === 'current' ? 0 : 1
      }

      return style
    })
  }
}
