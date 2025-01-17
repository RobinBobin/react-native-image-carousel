import type { StyleProp } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { TSlidePosition } from '../types'

import { BaseAnimationWithDuration } from './animationsWithDuration'
import { BaseAnimation } from './BaseAnimation'

export class NoAnimation extends BaseAnimation {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  getStyle(slidePosition: TSlidePosition): StyleProp<AnimatedStyle> {
    return {
      transform: [
        {
          translateX:
            slidePosition === 'current' ? 0 : (
              BaseAnimationWithDuration.VERY_BIG_NUMBER
            )
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
