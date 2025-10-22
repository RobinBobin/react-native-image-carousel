import type { TSlideId } from '../../../../mst'
import type { ISharedValue, TUseStyle } from '../../../types'

import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import { VERY_BIG_NUMBER } from '../../../constants'

export const useStyle = (
  slideId: TSlideId,
  translateX: ISharedValue<number>
): TUseStyle => {
  return () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const _translateX = useSharedValue(
      slideId === 'slide2' ? 0 : VERY_BIG_NUMBER
    )

    translateX.sharedValue = _translateX

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useAnimatedStyle(() => {
      const style = {
        transform: [{ translateX: _translateX.get() }]
      }
      return style
    })
  }
}
