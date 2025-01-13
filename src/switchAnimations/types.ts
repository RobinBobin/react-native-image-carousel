import type { StyleProp } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { TSlidePosition } from '../mst/SwitchAnimationAccessibleImageCarouselModel/types'

interface ISwitchAnimation {
  getStyle: (slidePosition: TSlidePosition) => StyleProp<AnimatedStyle>
  switch: () => void
  useStyles: () => void
}

type TSwitchAnimationFactory = new (
  carouselModel: ISwitchAnimationAccessibleImageCarouselModelInstance
) => ISwitchAnimation

export type { ISwitchAnimation, TSwitchAnimationFactory }
