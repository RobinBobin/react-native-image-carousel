import type { TAnimatedViewStyle, TSlidePosition } from '../types'

import { BaseAnimation } from './BaseAnimation'

export class NoAnimation extends BaseAnimation {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override cancelTransition(): void {
    // Nothing to do.
  }

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
    this.carouselModel.finishTransitionPhase()
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override useStyles(): void {
    // Nothing to do.
  }
}
