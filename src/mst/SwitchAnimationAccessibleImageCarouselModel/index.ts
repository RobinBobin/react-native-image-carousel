import type { Instance } from 'mobx-state-tree'
import type {
  ICarouselNumberDimensions,
  ISwitchAnimationAccessibleImageCarouselModelVolatile,
  TSlidePosition,
  TSwitchDirection
} from './types'

import { getType, types } from 'mobx-state-tree'
import { isNumber } from 'radashi'
import { verify } from 'simple-common-utils'

// eslint-disable-next-line id-length
export const SwitchAnimationAccessibleImageCarouselModel = types
  .model('SwitchAnimationAccessibleImageCarouselModel')
  .volatile<ISwitchAnimationAccessibleImageCarouselModelVolatile>(() => ({
    currentImageIndex: 0,
    imageData: [],
    isSwitchingStarted: false
  }))
  .views(self => ({
    get carouselNumberDimensions(): ICarouselNumberDimensions | undefined {
      const isPositiveNumber = (dimension: unknown): boolean => {
        return isNumber(dimension) && dimension > 0
      }

      const values = Object.values(self.carouselDimensions ?? {})

      return values.length && values.every(isPositiveNumber) ?
          (self.carouselDimensions as ICarouselNumberDimensions)
        : undefined
    },
    getImageIndex(this: void, slidePosition: TSlidePosition): number {
      if (slidePosition === 'current') {
        return self.currentImageIndex
      }

      if (slidePosition === 'next') {
        const canIncrement = self.currentImageIndex < self.imageData.length - 1

        return canIncrement ? self.currentImageIndex + 1 : 0
      }

      const canDecrement = Boolean(self.currentImageIndex)

      return canDecrement ?
          self.currentImageIndex - 1
        : self.imageData.length - 1
    },
    getSwitchDirection(): TSwitchDirection {
      verify(
        self.switchDirection,
        `${getType(self).name}.getSwitchDirection() can be invoked only when switching`
      )

      return self.switchDirection
    }
  }))
  .actions(self => ({
    finalizeSwitch(this: void): void {
      self.currentImageIndex = self.getImageIndex(self.getSwitchDirection())

      if (!self.isSwitchingStarted) {
        self.switchDirection = undefined
      }
    }
  }))

export interface ISwitchAnimationAccessibleImageCarouselModelInstance
  extends Instance<typeof SwitchAnimationAccessibleImageCarouselModel> {}
