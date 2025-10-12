import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAxis } from '../../types'

import {
  cancelAnimation,
  runOnJS,
  withDelay,
  withTiming
} from 'react-native-reanimated'

import { BaseAnimationWithDuration } from './BaseAnimationWithDuration'

export class SlideOverAnimation extends BaseAnimationWithDuration {
  constructor(
    carouselModel: ISlideTransitionAnimationAccessibleImageCarouselModelInstance,
    axis: TAxis = 'x'
  ) {
    super(axis, carouselModel)
  }

  override cancelTransition(): void {
    const { finishTransitionPhase, transitionDirection } = this.carouselModel

    cancelAnimation(this.getTranslate(transitionDirection))

    this.getTranslate(transitionDirection).value = withTiming(
      this.carouselModel.getSlideOffset(
        this.axes[0] as TAxis,
        transitionDirection
      ),
      { duration: this.duration },
      finished => {
        if (finished ?? true) {
          runOnJS(finishTransitionPhase)(false)
        }
      }
    )
  }

  override move(): void {
    this.resetTranslate()

    const { finishTransitionPhase, transitionDirection, transitionPhase } =
      this.carouselModel

    if (transitionPhase === 'finalization') {
      finishTransitionPhase()

      return
    }

    this.getTranslate(transitionDirection).value = withDelay(
      this.preTransitionDelayToUse,
      withTiming(
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        0,
        { duration: this.duration },
        finished => {
          if (finished ?? true) {
            runOnJS(finishTransitionPhase)(true)
          }
        }
      )
    )
  }
}
