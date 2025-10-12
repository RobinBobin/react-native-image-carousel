import type { TAnimatedViewStyle, TSlidePosition } from '../types'

import { BaseAnimation } from './BaseAnimation'

export class NoAnimation extends BaseAnimation {
  override getStyle(slidePosition: TSlidePosition): TAnimatedViewStyle {
    return {
      transform: [
        {
          translateX: this.carouselModel.getSlideOffset('x', slidePosition)
        }
      ]
    }
  }

  override move(): void {
    this.carouselModel.finalizeTransition()
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override useStyles(): void {
    // Nothing to do.
  }
}
