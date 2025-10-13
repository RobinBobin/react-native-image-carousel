import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAxis, TTransitionDirection } from '../../types'

import {
  cancelAnimation,
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

  override handleFling(flingDirection: TTransitionDirection): void {
    const { finishTransitionPhase, transitionDirection } = this.carouselModel

    const slideOffset = this.carouselModel.getSlideOffset(
      this.axes[0] as TAxis,
      transitionDirection
    )

    const translate = this.getTranslate(transitionDirection)
    const isAnimating = translate.value !== slideOffset

    console.log('handleFling()', flingDirection, `isAnimating: ${isAnimating}`)

    if (isAnimating) {
      const isFlingDirectionTheSame = flingDirection === transitionDirection

      if (isFlingDirectionTheSame) {
        return
      }

      cancelAnimation(translate)
    }

    cancelAnimation(translate)

    this.getTranslate(flingDirection).value = withTiming(
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      0,
      { duration: this.duration },
      finished => {
        if (finished ?? true) {
          runOnJS(finishTransitionPhase)()
        }
      }
    )
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
          } else {
            console.log('animation interrupted')
          }
        }
      )
    )

    finishTransitionPhase()
  }
}
