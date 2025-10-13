import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAxis } from '../../types'

import {
  // cancelAnimation,
  runOnJS,
  withDelay,
  withTiming
} from 'react-native-reanimated'
import { verify } from 'simple-common-utils'

import { BaseAnimationWithDuration } from './BaseAnimationWithDuration'

export class SlideOverAnimation extends BaseAnimationWithDuration {
  constructor(
    carouselModel: ISlideTransitionAnimationAccessibleImageCarouselModelInstance,
    axis: TAxis = 'x'
  ) {
    super(axis, carouselModel)
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  override cancelTransition(): void {
    throw new Error("Doesn't work yet")

    // const { finishTransitionPhase, transitionDirection } = this.carouselModel

    // cancelAnimation(this.getTranslate(transitionDirection))

    // this.getTranslate(transitionDirection).value = withTiming(
    //   this.carouselModel.getSlideOffset(
    //     this.axes[0] as TAxis,
    //     transitionDirection
    //   ),
    //   { duration: this.duration },
    //   finished => {
    //     if (finished ?? true) {
    //       runOnJS(finishTransitionPhase)()
    //     }
    //   }
    // )
  }

  override move(): void {
    const { finishTransitionPhase, transitionDirection, transitionPhase } =
      this.carouselModel

    verify(
      transitionPhase === 'requested',
      `'${this.constructor.name}.move()': 'transitionPhase' can't be '${transitionPhase}'`
    )

    this.resetTranslate()

    this.getTranslate(transitionDirection).value = withDelay(
      this.preTransitionDelayToUse,
      withTiming(
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        0,
        { duration: this.duration },
        finished => {
          if (finished ?? true) {
            runOnJS(finishTransitionPhase)()
          }
        }
      )
    )

    finishTransitionPhase()
  }
}
