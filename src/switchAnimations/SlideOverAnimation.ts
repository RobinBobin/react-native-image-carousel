import type { ReadonlyDeep } from 'type-fest'
import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { TAxis } from './helpers/SlidePositions/types'
import type { ISwitchAnimation } from './types'

import { runOnJS, withTiming } from 'react-native-reanimated'

import { SlidePositions } from './helpers/SlidePositions'

export class SlideOverAnimation
  extends SlidePositions
  implements ISwitchAnimation
{
  constructor(
    carouselModel: ReadonlyDeep<ISwitchAnimationAccessibleImageCarouselModelInstance>,
    axis: TAxis = 'x'
  ) {
    super(axis, carouselModel)
  }

  switch(): void {
    const { finalizeSwitch, switchDirectionSafe } = this.carouselModel

    this.setTranslateToCarouselDimension()

    this.getTranslate(switchDirectionSafe).value = withTiming(
      0,
      { duration: 1000 },
      () => {
        runOnJS(finalizeSwitch)()
      }
    )
  }
}
