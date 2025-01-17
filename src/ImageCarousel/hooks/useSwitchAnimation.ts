import type { IImageCarouselModelInstance } from '../../mst'

import { useEffect } from 'react'

import { SlideOverAnimation } from '../../switchAnimations'

export const useSwitchAnimation = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  carouselModel: IImageCarouselModelInstance
): void => {
  const { canSwitch, setSwitchAnimation, startSwitching } = carouselModel

  let switchAnimation = carouselModel.switchAnimation

  if (!switchAnimation) {
    switchAnimation = new SlideOverAnimation(carouselModel)

    setSwitchAnimation(switchAnimation)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (canSwitch && carouselModel.switchAnimation!.isAutoSwitchEnabled) {
      startSwitching('next')
    }
  }, [canSwitch, carouselModel.switchAnimation, startSwitching])

  switchAnimation.useStyles()
}
