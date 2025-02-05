import type { StyleProp } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { TSlidePosition } from '../types'

import { BaseAnimation } from './BaseAnimation'

export class NoAnimation extends BaseAnimation {
  getStyle(slidePosition: TSlidePosition): StyleProp<AnimatedStyle> {
    return {
      transform: [
        {
          translateX: this.carouselModel.getSlideOffset('x', slidePosition)
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
