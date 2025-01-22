import type { StyleProp, TransformsStyle } from 'react-native'
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated'
import type { ReadonlyDeep } from 'type-fest'
import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../../../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { ICarouselNumberDimensions } from '../../../mst/SwitchAnimationAccessibleImageCarouselModel/types'
import type { TSlidePosition, TSwitchDirection } from '../../../types'
import type {
  TAxis,
  TSlideData,
  TSlideDataEntry,
  TSlideDataRecord
} from './types'

import { castArray, objectify } from 'radashi'
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { verify } from 'simple-common-utils'

import { INITIAL_SLIDE_POSITIONS } from '../../../constants'
import { BaseAnimation } from '../../BaseAnimation'

export abstract class BaseAnimationWithDuration extends BaseAnimation {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  static readonly VERY_BIG_NUMBER = 1_000_000

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  private _duration = 1000

  private readonly slideDataRecord: TSlideDataRecord

  protected constructor(
    axes: TAxis | readonly TAxis[],
    carouselModel: ReadonlyDeep<ISwitchAnimationAccessibleImageCarouselModelInstance>
  ) {
    super(carouselModel)

    this.slideDataRecord = BaseAnimationWithDuration.createSlideDataRecord(
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
    const axisKey = this.getAxis(axis)
    const slideData = this.slideDataRecord[axisKey]

    verify(
      slideData,
      `BaseAnimationWithDuration.getStyle(): 'slideData' is undefined for '${axisKey}'`
    )

    return slideData[slidePosition].animatedStyle
  }

  useStyles(): void {
    for (const [axis, slideData] of Object.entries(this.slideDataRecord) as [
      TAxis,
      TSlideData
    ][]) {
      for (const [slidePosition, slideDatum] of Object.entries(
        slideData
      ) as TSlideDataEntry[]) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const translate = useSharedValue(
          slidePosition === 'current' ? 0 : (
            BaseAnimationWithDuration.VERY_BIG_NUMBER
          )
        )

        // eslint-disable-next-line react-hooks/rules-of-hooks
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
      }
    }
  }

  protected getTranslate(
    slidePosition: TSlidePosition,
    axis?: TAxis
  ): SharedValue<number> {
    const tag = 'BaseAnimationWithDuration.getTranslate():'

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
  protected setTranslateToCarouselDimension(
    carouselNumberDimensions: Readonly<ICarouselNumberDimensions>,
    switchDirectionSafe: TSwitchDirection
  ): void {
    for (const axis of Object.keys(this.slideDataRecord) as TAxis[]) {
      const key: keyof ICarouselNumberDimensions =
        axis === 'x' ? 'width' : 'height'

      const value = carouselNumberDimensions[key]

      this.getTranslate(switchDirectionSafe, axis).value =
        switchDirectionSafe === 'next' ? value : -value
    }
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
