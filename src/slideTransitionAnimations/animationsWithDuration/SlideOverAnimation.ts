import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAxis, TTransitionDirection } from '../../types'

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

  override handleFling(flingDirection: TTransitionDirection): void {
    const { finishTransition, transitionDirection } = this.carouselModel

    const isFlingDirectionTheSame = flingDirection === transitionDirection

    const slideOffset = this.carouselModel.getSlideOffset(
      this.axes[0] as TAxis,
      transitionDirection
    )

    const translate = this.getTranslate(transitionDirection)
    const isAnimating = translate.value !== slideOffset

    if (isAnimating && isFlingDirectionTheSame) {
      return
    }

    cancelAnimation(translate)

    const slidePosition = isAnimating ? transitionDirection : flingDirection

    this.getTranslate(slidePosition).value = withTiming(
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      isAnimating ? slideOffset : 0,
      { duration: this.duration },
      finished => {
        if (finished ?? true) {
          runOnJS(finishTransition)(isAnimating ? false : flingDirection)
        }
      }
    )
  }

  override move(): void {
    const { finishTransition, transitionDirection } = this.carouselModel

    this.resetTranslate()

    this.getTranslate(transitionDirection).value = withDelay(
      this.preTransitionDelayToUse,
      withTiming(
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        0,
        { duration: this.duration },
        finished => {
          if (finished ?? true) {
            runOnJS(finishTransition)()
          }
        }
      )
    )
  }
}
