import type { StyleProp, TransformsStyle } from 'react-native'
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated'
import type {
  ICarouselNumberDimensions,
  TSlidePosition,
  TSwitchDirection
} from '../../../mst/SwitchAnimationAccessibleImageCarouselModel/types'
import type { ISwitchAnimation } from '../../types'
import type { TAxis, TSlideData, TSlideDataRecord, TSlideDatum } from './types'

import { castArray, objectify } from 'radashi'
import {
  runOnUI,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { verify } from 'simple-common-utils'

export class SlidePositions implements Pick<ISwitchAnimation, 'getStyle'> {
  static readonly initialSlidePositions: readonly [
    TSlidePosition,
    TSlidePosition,
    TSlidePosition
  ] = ['previous', 'current', 'next']

  private readonly slidePositions = [...SlidePositions.initialSlidePositions]

  constructor(
    axes: TAxis | readonly TAxis[],
    private readonly slideDataRecord = SlidePositions.createSlideDataRecord(
      castArray(axes)
    )
  ) {}

  getStyle(
    slidePosition: TSlidePosition,
    axis?: TAxis
  ): StyleProp<AnimatedStyle> {
    const tag = 'SlidePositions.getAnimatedStyle():'

    const axisKey = axis ?? SlidePositions.getTheKey(this.slideDataRecord)

    const slideData = this.slideDataRecord[axisKey]

    verify(slideData, `${tag} 'slideData' is undefined for '${axisKey}'`)

    const slideDatum = slideData[slidePosition]

    return slideDatum.animatedStyle
  }

  getSwitchValues(
    carouselNumberDimensions: Readonly<ICarouselNumberDimensions>,
    switchDirection: TSwitchDirection,
    axis?: TAxis
  ): Record<TSlidePosition, number> {
    const value = SlidePositions.getCarouselWidthOrHeight(
      axis ?? SlidePositions.getTheKey(this.slideDataRecord),
      carouselNumberDimensions
    )

    if (switchDirection === 'next') {
      return {
        current: -value,
        next: 0,
        previous: value
      }
    }

    return {
      current: value,
      next: -value,
      previous: 0
    }
  }

  getTranslate(
    slidePosition: TSlidePosition,
    axis?: TAxis
  ): SharedValue<number> {
    const tag = 'SlidePositions.getSlideTranslate():'

    const axisKey = axis ?? SlidePositions.getTheKey(this.slideDataRecord)

    const slideData = this.slideDataRecord[axisKey]

    verify(slideData, `${tag} 'slideData' is undefined for '${axisKey}'`)

    const patternSlidePosition = SlidePositions.initialSlidePositions.findIndex(
      initialSlidePosition => initialSlidePosition === slidePosition
    )

    const notFound = -1

    verify(
      patternSlidePosition !== notFound,
      `${tag} '${slidePosition}' not found in ${SlidePositions.initialSlidePositions.join(', ')}`
    )

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { translate } = slideData[this.slidePositions[patternSlidePosition]!]

    verify(
      translate,
      `${tag} 'translate' is undefined for '${axisKey}' and '${slidePosition}'`
    )

    return translate
  }

  switchSlidePositions(switchDirection: TSwitchDirection): void {
    if (switchDirection === 'next') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.slidePositions.push(this.slidePositions.shift()!)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.slidePositions.unshift(this.slidePositions.pop()!)
    }
  }

  useStyles(
    carouselNumberDimensions: Readonly<ICarouselNumberDimensions> | undefined
  ): void {
    const veryBigNumber = 1_000_000

    Object.entries(this.slideDataRecord).forEach(([axis, slideData]) => {
      Object.entries(slideData).forEach(entry => {
        const [slidePosition, slideDatum] = entry as [
          TSlidePosition,
          TSlideDatum
        ]

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

    if (carouselNumberDimensions) {
      runOnUI(
        (
          dimensions: Readonly<ICarouselNumberDimensions>,
          // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
          slideDataRecord: TSlideDataRecord
        ) => {
          Object.entries(slideDataRecord).forEach(entry => {
            const [axis, slideData] = entry as [TAxis, TSlideData]
            const { next, previous } = slideData

            const key: keyof ICarouselNumberDimensions =
              axis === 'x' ? 'width' : 'height'

            const value = dimensions[key]

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            previous.translate!.value = -value
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            next.translate!.value = value
          })
        }
      )(carouselNumberDimensions, this.slideDataRecord)
    }
  }

  static getCarouselWidthOrHeight(
    axis: TAxis,
    carouselNumberDimensions: Readonly<ICarouselNumberDimensions>
  ): number {
    const key: keyof ICarouselNumberDimensions =
      axis === 'x' ? 'width' : 'height'

    return carouselNumberDimensions[key]
  }

  static getTheKey(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    slideDataRecord: TSlideDataRecord,
    errorMessage = "'axis' can't be omitted if both axes are used"
  ): TAxis {
    const keys = Object.keys(slideDataRecord) as TAxis[]

    verify(keys.length === 1, errorMessage)

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
          SlidePositions.initialSlidePositions,
          initialSlidePosition => initialSlidePosition,
          () => ({})
        )
    )
  }
}
