import type { TSlideId } from '../../../../mst'
import type { ISharedValue, TUseStyle } from '../../../types'

import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import { VERY_BIG_NUMBER } from '../../../constants'

export const _useStyle = (
  slideId: TSlideId,
  translateX: ISharedValue<number>
): TUseStyle => {
  return () => {
    const _translateX = useSharedValue(
      slideId === 'slide2' ? 0 : VERY_BIG_NUMBER
    )

    translateX.sharedValue = _translateX

    return useAnimatedStyle(() => {
      const style = {
        transform: [{ translateX: _translateX.get() }]
      }
      return style
    })
  }
}
