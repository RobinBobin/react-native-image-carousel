import type { TAnimatedViewStyle, TSlidePosition } from '../types'

import { BaseAnimation } from './BaseAnimation'

export class NoAnimation extends BaseAnimation {
  getStyle(slidePosition: TSlidePosition): TAnimatedViewStyle {
    return {
      transform: [
        {
          translateX: this.carouselModel.getSlideOffset('x', slidePosition)
        }
      ]
    }
  }

  move(): void {
    this.carouselModel.finalizeTransition()
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  useStyles(): void {
    //
  }
}
