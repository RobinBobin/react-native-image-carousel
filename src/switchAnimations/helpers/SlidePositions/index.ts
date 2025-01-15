import type { StyleProp, TransformsStyle } from 'react-native'
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated'
import type { ReadonlyDeep } from 'type-fest'
import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../../../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { ICarouselNumberDimensions } from '../../../mst/SwitchAnimationAccessibleImageCarouselModel/types'
import type { TSlidePosition } from '../../../types'
import type { ISwitchAnimation } from '../../types'
import type { TAxis, TSlideDataEntry, TSlideDataRecord } from './types'

import { castArray, objectify } from 'radashi'
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { verify } from 'simple-common-utils'

import { INITIAL_SLIDE_POSITIONS } from '../../../constants'

export class SlidePositions implements Omit<ISwitchAnimation, 'switch'> {
  private readonly slideDataRecord: TSlideDataRecord

  protected constructor(
    axes: TAxis | readonly TAxis[],
    protected readonly carouselModel: ReadonlyDeep<ISwitchAnimationAccessibleImageCarouselModelInstance>
  ) {
    this.slideDataRecord = SlidePositions.createSlideDataRecord(castArray(axes))
  }

  getStyle(
    slidePosition: TSlidePosition,
    axis?: TAxis
  ): StyleProp<AnimatedStyle> {
    const axisKey = this.getAxis(axis)
    const slideData = this.slideDataRecord[axisKey]

    verify(
      slideData,
      `SlidePositions.getStyle(): 'slideData' is undefined for '${axisKey}'`
    )

    return slideData[slidePosition].animatedStyle
  }

  useStyles(): void {
    const veryBigNumber = 1_000_000

    Object.entries(this.slideDataRecord).forEach(([axis, slideData]) => {
      Object.entries(slideData).forEach(entry => {
        const [slidePosition, slideDatum] = entry as TSlideDataEntry

        const translate = useSharedValue(
          slidePosition === 'current' ? 0 : veryBigNumber
        )

        const animatedStyle = useAnimatedStyle(() => {
          const key = `translate${axis.toUpperCase()}`

          return {
            transform: [
              { [key]: translate.value }
            ] as unknown as TransformsStyle['transform']
          }
        })

        if (!slideDatum.translate) {
          slideDatum.translate = translate
          slideDatum.animatedStyle = animatedStyle
        }
      })
    })
  }

  protected getTranslate(
    slidePosition: TSlidePosition,
    axis?: TAxis
  ): SharedValue<number> {
    const tag = 'SlidePositions.getTranslate():'

    const axisKey = this.getAxis(axis)
    const slideData = this.slideDataRecord[axisKey]

    verify(slideData, `${tag} 'slideData' is undefined for '${axisKey}'`)

    const { translate } = slideData[slidePosition]

    verify(
      translate,
      `${tag} 'translate' is undefined for '${axisKey}' and '${slidePosition}'`
    )

    return translate
  }

  // eslint-disable-next-line id-length
  protected setTranslateToCarouselDimension(axis?: TAxis): void {
    const { carouselNumberDimensions, switchDirectionSafe } = this.carouselModel

    const key: keyof ICarouselNumberDimensions =
      this.getAxis(axis) === 'x' ? 'width' : 'height'

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const value = carouselNumberDimensions![key]

    this.getTranslate(switchDirectionSafe, axis).value =
      switchDirectionSafe === 'next' ? value : -value
  }

  private getAxis(axis?: TAxis): TAxis {
    if (axis) {
      return axis
    }

    const keys = Object.keys(this.slideDataRecord) as TAxis[]

    verify(keys.length === 1, "'axis' can't be omitted if both axes are used")

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return keys[0]!
  }

  private static createSlideDataRecord(
    axes: readonly TAxis[]
  ): TSlideDataRecord {
    return objectify(
      axes,
      axis => axis,
      () =>
        objectify(
          INITIAL_SLIDE_POSITIONS,
          initialSlidePosition => initialSlidePosition,
          () => ({})
        )
    )
  }
}
