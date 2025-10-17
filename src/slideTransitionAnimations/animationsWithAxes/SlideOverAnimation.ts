import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAxis, TTransitionDirection } from '../../types'
import type { TWithTranslateReturnType } from './helpers'

import { objectify } from 'radashi'
import {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  withDelay,
  withTiming
} from 'react-native-reanimated'

import { SLIDE_POSITIONS } from '../../constants'
import { BaseAnimationWithAxes } from './BaseAnimationWithAxes'
import { getAxis, getTranslationAnimatedStyle, withTranslate } from './helpers'

export class SlideOverAnimation extends BaseAnimationWithAxes {
  private readonly withTranslate: TWithTranslateReturnType

  constructor(
    carouselModel: ISlideTransitionAnimationAccessibleImageCarouselModelInstance,
    axis: TAxis = 'x'
  ) {
    super(axis, carouselModel)

    this.withTranslate = withTranslate(this.axes, carouselModel)
  }

  override handleFling(flingDirection: TTransitionDirection): void {
    const { finishTransition, transitionDirection } = this.carouselModel

    const isFlingDirectionTheSame = flingDirection === transitionDirection

    const slideOffset = this.carouselModel.getSlideOffset(
      getAxis(this.axes),
      transitionDirection
    )

    const translate = this.withTranslate.getTranslate(transitionDirection)
    const isAnimating = translate.value !== slideOffset

    if (isAnimating && isFlingDirectionTheSame) {
      return
    }

    cancelAnimation(translate)

    const slidePosition = isAnimating ? transitionDirection : flingDirection

    this.withTranslate.getTranslate(slidePosition).value = withTiming(
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

    this.withTranslate.resetTranslate()

    this.withTranslate.getTranslate(transitionDirection).value = withDelay(
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

  override useStyles(): void {
    this.styles = objectify(
      SLIDE_POSITIONS,
      slidePosition => slidePosition,
      slidePosition => {
        const axisSharedValues =
          this.withTranslate.useSharedValues(slidePosition)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return useAnimatedStyle(
          () =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
            getTranslationAnimatedStyle(axisSharedValues) as any
        )
      }
    )
  }
}
