import type { StyleProp } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { ReadonlyDeep } from 'type-fest'
import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { TSlidePosition } from '../mst/SwitchAnimationAccessibleImageCarouselModel/types'
import type { ISwitchAnimation } from './types'

import { SlidePositions } from './helpers/SlidePositions'

export class NoAnimation implements ISwitchAnimation {
  private readonly slidePositions = new SlidePositions('x')

  constructor(
    private readonly carouselModel: ReadonlyDeep<ISwitchAnimationAccessibleImageCarouselModelInstance>
  ) {}

  getStyle(slidePosition: TSlidePosition): StyleProp<AnimatedStyle> {
    return this.slidePositions.getStyle(slidePosition)
  }

  switch(): void {
    const { carouselNumberDimensions, finalizeSwitch, getSwitchDirection } =
      this.carouselModel

    if (!carouselNumberDimensions) {
      return
    }

    Object.entries(
      this.slidePositions.getSwitchValues(
        carouselNumberDimensions,
        getSwitchDirection()
      )
    ).forEach(([slidePosition, value]) => {
      this.slidePositions.getTranslate(slidePosition as TSlidePosition).value =
        value
    })

    this.slidePositions.switchSlidePositions(getSwitchDirection())

    finalizeSwitch()
  }

  useStyles(): void {
    this.slidePositions.useStyles(this.carouselModel.carouselNumberDimensions)
  }
}
