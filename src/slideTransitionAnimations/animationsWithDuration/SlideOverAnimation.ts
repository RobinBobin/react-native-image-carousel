import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAxis } from '../../types'

import { runOnJS, withDelay, withTiming } from 'react-native-reanimated'

import { BaseAnimationWithDuration } from './BaseAnimationWithDuration'

export class SlideOverAnimation extends BaseAnimationWithDuration {
  constructor(
    carouselModel: ISlideTransitionAnimationAccessibleImageCarouselModelInstance,
    axis: TAxis = 'x'
  ) {
    super(axis, carouselModel)
  }

  override move(): void {
    this.resetTranslate()

    const {
      finalizeTransition,
      transitionDirectionVerified,
      transitionPhaseVerified
    } = this.carouselModel

    if (transitionPhaseVerified === 'finalization') {
      finalizeTransition()

      return
    }

    this.getTranslate(transitionDirectionVerified).value = withDelay(
      this.preTransitionDelayToUse,
      withTiming(
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        0,
        { duration: this.duration },
        finished => {
          if (finished ?? true) {
            runOnJS(finalizeTransition)()
          }
        }
      )
    )
  }
}
