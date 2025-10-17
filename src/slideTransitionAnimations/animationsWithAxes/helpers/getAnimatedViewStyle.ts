import type { ReadonlyDeep } from 'type-fest'
import type { TAnimatedViewStyle } from '../../../types'
import type { TAxisSharedValues } from './types'

export const getAnimatedViewStyle = (
  axisSharedValues: ReadonlyDeep<TAxisSharedValues>,
  // eslint-disable-next-line id-length
  animatedPropertyNameWithoutAxis: string
): TAnimatedViewStyle => {
  'worklet'

  // Any valid property name just to calm ts down.
  type TDummy = 'translateX'

  const transform = Object.entries(axisSharedValues).map(
    ([axis, sharedValue]) => {
      const key =
        `${animatedPropertyNameWithoutAxis}${axis.toUpperCase()}` as TDummy

      return { [key]: sharedValue.value }
    }
  )

  return { transform }
}
