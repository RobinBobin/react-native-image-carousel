import type { StyleProp, TransformsStyle } from 'react-native'
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated'
import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../../../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAxis, TSlidePosition } from '../../../types'
import type { TAxisAnimationData } from './types'

import { castArray, isUndefined, objectify } from 'radashi'
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { verify } from 'simple-common-utils'

import { BaseAnimation } from '../../BaseAnimation'

export abstract class BaseAnimationWithDuration extends BaseAnimation {
  private _duration = 1000

  private readonly axisAnimationData: TAxisAnimationData

  protected constructor(
    axes: TAxis | readonly TAxis[],
    carouselModel: ISlideTransitionAnimationAccessibleImageCarouselModelInstance
  ) {
    super(carouselModel)

    this.axisAnimationData = BaseAnimationWithDuration.createAxisAnimationData(
      castArray(axes)
    )
  }

  get duration(): number {
    return this._duration
  }

  set duration(duration: number) {
    this._duration = duration
  }

  getStyle(
    slidePosition: TSlidePosition,
    axis?: TAxis
  ): StyleProp<AnimatedStyle> {
    const axisKey = this.getAxis(slidePosition, axis)

    const { animatedStyle } =
      this.axisAnimationData[slidePosition][axisKey] ?? {}

    verify(
      !isUndefined(animatedStyle),
      `BaseAnimationWithDuration.getStyle(${slidePosition}, ${axisKey}): 'animatedStyle' can't be undefined`
    )

    return animatedStyle
  }

  useStyles(): void {
    for (const [slidePosition, axisAnimationDatum] of Object.entries(
      this.axisAnimationData
    )) {
      Object.keys(axisAnimationDatum).forEach(axis => {
        const tAxis = axis as TAxis

        const translate = useSharedValue(
          this.carouselModel.getSlideOffset(
            tAxis,
            slidePosition as TSlidePosition
          )
        )

        const animatedStyle = useAnimatedStyle(() => {
          const key = `translate${axis.toUpperCase()}`

          return {
            transform: [
              { [key]: translate.value }
            ] as unknown as TransformsStyle['transform']
          }
        })

        if (!axisAnimationDatum[tAxis]) {
          axisAnimationDatum[tAxis] = {
            animatedStyle,
            translate
          }
        }
      })
    }
  }

  protected getTranslate(
    slidePosition: TSlidePosition,
    axis?: TAxis
  ): SharedValue<number> {
    const axisKey = this.getAxis(slidePosition, axis)
    const { translate } = this.axisAnimationData[slidePosition][axisKey] ?? {}

    verify(
      translate,
      `BaseAnimationWithDuration.getTranslate(${slidePosition}, ${axis}): 'translate' can't be undefined`
    )

    return translate
  }

  protected resetTranslate(): void {
    for (const [slidePosition, axisAnimationDatum] of Object.entries(
      this.axisAnimationData
    )) {
      Object.keys(axisAnimationDatum).forEach(axis => {
        const tAxis = axis as TAxis

        const { translate } = axisAnimationDatum[tAxis] ?? {}

        verify(
          translate,
          `BaseAnimationWithDuration.resetTranslate(${slidePosition}, ${axis}): 'translate' can't be undefined`
        )

        translate.value = this.carouselModel.getSlideOffset(
          tAxis,
          slidePosition as TSlidePosition
        )
      })
    }
  }

  private getAxis(
    slidePosition: TSlidePosition,
    axis: TAxis | undefined
  ): TAxis {
    if (axis) {
      return axis
    }

    const [key0, key1] = Object.keys(
      this.axisAnimationData[slidePosition]
    ) as TAxis[]

    verify(key0, 'No axis specified')
    verify(!key1, "'axis' can't be omitted if both axes are used")

    return key0
  }

  private static createAxisAnimationData(
    axes: readonly TAxis[]
  ): TAxisAnimationData {
    const datum = objectify(
      axes,
      axis => axis,
      () => undefined
    )

    return {
      current: { ...datum },
      next: { ...datum },
      previous: { ...datum }
    }
  }
}
