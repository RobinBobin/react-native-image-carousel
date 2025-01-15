import type { IImageCarouselModelInstance } from '../../mst'
import type { ISwitchAnimation } from '../../switchAnimations'

import { SlideOverAnimation } from '../../switchAnimations'

export const useSwitchAnimation = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  carouselModel: IImageCarouselModelInstance
): ISwitchAnimation => {
  const { setSwitchAnimation, switchAnimation: switchAnimation_ } =
    carouselModel

  let switchAnimation = switchAnimation_

  if (!switchAnimation) {
    switchAnimation = new SlideOverAnimation(carouselModel)

    setSwitchAnimation(switchAnimation)
  }

  switchAnimation.useStyles()

  return switchAnimation
}
