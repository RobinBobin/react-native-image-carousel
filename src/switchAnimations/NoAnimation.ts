import type { StyleProp } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { ReadonlyDeep } from 'type-fest'
import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { ISwitchAnimation } from './types'

export class NoAnimation implements ISwitchAnimation {
  constructor(
    private readonly carouselModel: ReadonlyDeep<ISwitchAnimationAccessibleImageCarouselModelInstance>
  ) {}

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  getStyle(): StyleProp<AnimatedStyle> {
    return {}
  }

  switch(): void {
    this.carouselModel.finalizeSwitch()
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  useStyles(): void {
    //
  }
}
