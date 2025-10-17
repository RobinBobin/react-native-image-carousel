import type { TGetSharedValue } from '../getSharedValue'
import type { TResetSlideSharedValues } from '../resetSlideSharedValues'
import type { TUseAxisSharedValues, TWithSlideSharedValues } from '../types'
import type { IWithTranslateReturnType } from './types'

import { createSlideSharedValues } from '../createSlideSharedValues'
import { getSharedValue } from '../getSharedValue'
import { resetSlideSharedValues } from '../resetSlideSharedValues'
import { useAxisSharedValuesHelper } from '../useAxisSharedValues'

export const withTranslate: TWithSlideSharedValues<IWithTranslateReturnType> = (
  axes,
  carouselModel
) => {
  const translates = createSlideSharedValues(axes)

  const getTranslate: TGetSharedValue = (slidePosition, axis) => {
    return getSharedValue({
      axes,
      axis,
      slidePosition,
      slideSharedValues: translates,
      tag: 'translate'
    })
  }

  const resetTranslate: TResetSlideSharedValues = (): void => {
    resetSlideSharedValues(axes, (axis, slidePosition) => {
      getTranslate(slidePosition, axis).value = carouselModel.getSlideOffset(
        axis,
        slidePosition
      )
    })
  }

  const useTranslate: TUseAxisSharedValues = slidePosition => {
    return useAxisSharedValuesHelper({
      axes,
      getInitialValue: axis =>
        carouselModel.getSlideOffset(axis, slidePosition),
      slidePosition,
      slideSharedValues: translates
    })
  }

  return {
    getTranslate,
    resetTranslate,
    useTranslate
  }
}
