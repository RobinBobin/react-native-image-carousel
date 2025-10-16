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

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override handleFling(): void {
    //
  }

  override move(): void {
    this.carouselModel.finishTransition()
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override useStyles(): void {
    // Nothing to do.
  }
}
