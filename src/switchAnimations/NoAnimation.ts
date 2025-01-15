import type { ReadonlyDeep } from 'type-fest'
import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { ISwitchAnimation } from './types'

import { BaseAnimation } from './BaseAnimation'

export class NoAnimation extends BaseAnimation implements ISwitchAnimation {
  constructor(
    carouselModel: ReadonlyDeep<ISwitchAnimationAccessibleImageCarouselModelInstance>
  ) {
    super('x', carouselModel)
  }

  switch(): void {
    const { carouselNumberDimensions, finalizeSwitch, switchDirectionSafe } =
      this.carouselModel

    if (!carouselNumberDimensions) {
      return
    }

    this.slidePositions
      .getSwitchValues(carouselNumberDimensions, switchDirectionSafe)
      .forEach(([slidePosition, value]) => {
        this.slidePositions.getTranslate(slidePosition).value = value
      })

    this.slidePositions.switchSlidePositions(switchDirectionSafe)

    finalizeSwitch()
  }
}
