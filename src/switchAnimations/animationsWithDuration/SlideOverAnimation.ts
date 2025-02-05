import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { TAxis } from '../../types'

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
    this.resetTranslate()

    const { finalizeSwitch, switchDirectionVerified, switchPhaseVerified } =
      this.carouselModel

    if (switchPhaseVerified === 'finalization') {
      finalizeSwitch()

      return
    }

    this.getTranslate(switchDirectionVerified).value = withTiming(
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
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
