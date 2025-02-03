import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { TAxis } from './BaseAnimationWithDuration/types'

import { runOnJS, withTiming } from 'react-native-reanimated'

import { BaseAnimationWithDuration } from './BaseAnimationWithDuration'

export class SlideOverAnimation extends BaseAnimationWithDuration {
  constructor(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    carouselModel: ISwitchAnimationAccessibleImageCarouselModelInstance,
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
