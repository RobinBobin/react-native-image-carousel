import type { TGetAnimatedViewStyle } from '../types'

export const getTranslationAnimatedStyle: TGetAnimatedViewStyle =
  axisSharedValues => {
    'worklet'

    type TDummy = 'translateX'

    const transform = Object.entries(axisSharedValues).map(
      ([axis, translate]) => {
        const key = `translate${axis.toUpperCase()}` as TDummy

        return { [key]: translate.value }
      }
    )

    return { transform }
  }
