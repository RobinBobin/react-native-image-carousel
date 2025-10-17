import type { SharedValue } from 'react-native-reanimated'
import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../../../../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAxes } from '../../../../types'
import type { TAxisSharedValues, TSlideSharedValues } from '../types'
import type { TWithTranslateReturnType } from './types'

import { objectify } from 'radashi'
import { useSharedValue } from 'react-native-reanimated'
import { verify } from 'simple-common-utils'

import { SLIDE_POSITIONS } from '../../../../constants'
import { getAxis } from '../getAxis'

export const withTranslate = (
  axes: TAxes,
  carouselModel: ISlideTransitionAnimationAccessibleImageCarouselModelInstance
): TWithTranslateReturnType => {
  const axisSharedValues = objectify(
    axes,
    axis => axis,
    () => undefined
  )

  const translates: TSlideSharedValues<true> = {
    current: { ...axisSharedValues },
    next: { ...axisSharedValues },
    previous: { ...axisSharedValues }
  }

  return {
    getTranslate(slidePosition, axis): SharedValue<number> {
      const axisKey = getAxis(axes, axis)

      const translate = translates[slidePosition][axisKey]

      verify(
        translate,
        `withTranslate().getTranslate(${slidePosition}, ${axis}): 'translate' can't be nullish`
      )

      return translate
    },
    resetTranslate(): void {
      SLIDE_POSITIONS.forEach(slidePosition => {
        axes.forEach(axis => {
          this.getTranslate(slidePosition, axis).value =
            carouselModel.getSlideOffset(axis, slidePosition)
        })
      })
    },
    useSharedValues(slidePosition): TAxisSharedValues {
      axes.forEach(axis => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const translate = useSharedValue(
          carouselModel.getSlideOffset(axis, slidePosition)
        )

        // [Reanimated] Tried to modify key `x` of an object which has been already passed to a worklet.
        if (!translates[slidePosition][axis]) {
          translates[slidePosition][axis] = translate
        }
      })

      return translates[slidePosition] as TAxisSharedValues
    }
  }
}
