import type { StyleProp } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { ReadonlyDeep } from 'type-fest'
import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { TSlidePosition } from '../mst/SwitchAnimationAccessibleImageCarouselModel/types'
import type { TAxis } from './helpers/SlidePositions/types'
import type { ISwitchAnimation } from './types'

import { SlidePositions } from './helpers/SlidePositions'

export abstract class BaseAnimation
  implements Pick<ISwitchAnimation, 'getStyle' | 'useStyles'>
{
  constructor(
    axes: TAxis | readonly TAxis[],
    protected readonly carouselModel: ReadonlyDeep<ISwitchAnimationAccessibleImageCarouselModelInstance>,
    protected readonly slidePositions = new SlidePositions(axes)
  ) {}

  getStyle(slidePosition: TSlidePosition): StyleProp<AnimatedStyle> {
    return this.slidePositions.getStyle(slidePosition)
  }

  useStyles(): void {
    this.slidePositions.useStyles(this.carouselModel.carouselNumberDimensions)
  }
}
