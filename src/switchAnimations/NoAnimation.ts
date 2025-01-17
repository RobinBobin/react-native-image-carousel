import type { StyleProp } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { ReadonlyDeep } from 'type-fest'
import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { TSlidePosition } from '../types'
import type { ISwitchAnimation } from './types'

import { SlidePositions } from './helpers/SlidePositions'

export class NoAnimation implements ISwitchAnimation {
  constructor(
    private readonly carouselModel: ReadonlyDeep<ISwitchAnimationAccessibleImageCarouselModelInstance>
  ) {}

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  getStyle(slidePosition: TSlidePosition): StyleProp<AnimatedStyle> {
    return {
      transform: [
        {
          translateX:
            slidePosition === 'current' ? 0 : SlidePositions.VERY_BIG_NUMBER
        }
      ]
    }
  }

  switch(): void {
    this.carouselModel.finalizeSwitch()
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  useStyles(): void {
    //
  }
}
