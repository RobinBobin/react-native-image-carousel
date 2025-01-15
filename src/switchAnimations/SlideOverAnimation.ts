import type { ReadonlyDeep } from 'type-fest'
import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { TSwitchValues } from './helpers/SlidePositions/types'
import type { ISwitchAnimation } from './types'

import { runOnJS, withTiming } from 'react-native-reanimated'

import { BaseAnimation } from './BaseAnimation'

export class SlideOverAnimation
  extends BaseAnimation
  implements ISwitchAnimation
{
  constructor(
    carouselModel: ReadonlyDeep<ISwitchAnimationAccessibleImageCarouselModelInstance>
  ) {
    super('x', carouselModel)
  }

  switch(): void {
    const { carouselNumberDimensions, finalizeSwitch, switchDirectionSafe } =
      this.carouselModel

    if (!carouselNumberDimensions) {
      return
    }

    const finalize = (values: TSwitchValues): void => {
      for (const [slidePosition, value] of values) {
        if (slidePosition !== switchDirectionSafe) {
          this.slidePositions.getTranslate(slidePosition).value = value
        }
      }

      this.slidePositions.switchSlidePositions(switchDirectionSafe)

      finalizeSwitch()
    }

    const switchValues = this.slidePositions.getSwitchValues(
      carouselNumberDimensions,
      switchDirectionSafe
    )

    this.slidePositions.getTranslate(switchDirectionSafe).value = withTiming(
      0,
      { duration: 1000 },
      () => {
        runOnJS(finalize)(switchValues)
      }
    )
  }
}
