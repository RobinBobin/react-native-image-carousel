import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAxis } from '../../types'

import { runOnJS, withTiming } from 'react-native-reanimated'

import { BaseAnimationWithDuration } from './BaseAnimationWithDuration'

export class SlideOverAnimation extends BaseAnimationWithDuration {
  constructor(
    carouselModel: ISlideTransitionAnimationAccessibleImageCarouselModelInstance,
    axis: TAxis = 'x'
  ) {
    super(axis, carouselModel)
  }

  move(): void {
    this.resetTranslate()

    const {
      finalizeTransition,
      movementDirectionVerified,
      movementPhaseVerified
    } = this.carouselModel

    if (movementPhaseVerified === 'finalization') {
      finalizeTransition()

      return
    }

    this.getTranslate(movementDirectionVerified).value = withTiming(
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      0,
      { duration: this.duration },
      finished => {
        if (finished ?? true) {
          runOnJS(finalizeTransition)()
        }
      }
    )
  }
}
