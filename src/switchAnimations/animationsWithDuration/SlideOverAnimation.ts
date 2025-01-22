import type { ReadonlyDeep } from 'type-fest'
import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { TAxis } from './BaseAnimationWithDuration/types'

import { runOnJS, withTiming } from 'react-native-reanimated'

import { BaseAnimationWithDuration } from './BaseAnimationWithDuration'

export class SlideOverAnimation extends BaseAnimationWithDuration {
  constructor(
    carouselModel: ReadonlyDeep<ISwitchAnimationAccessibleImageCarouselModelInstance>,
    axis: TAxis = 'x'
  ) {
    super(axis, carouselModel)
  }

  switch(): void {
    const { carouselNumberDimensions, finalizeSwitch, switchDirectionSafe } =
      this.carouselModel

    this.setTranslateToCarouselDimension(
      carouselNumberDimensions,
      switchDirectionSafe
    )

    this.getTranslate(switchDirectionSafe).value = withTiming(
      0,
      { duration: this.duration },
      finished => {
        if (finished ?? true) {
          runOnJS(finalizeSwitch)()
        }
      }
    )
  }
}
