import type { Instance } from 'mobx-state-tree'
import type { TSlidePosition, TSwitchDirection } from '../../types'
import type {
  ICarouselNumberDimensions,
  ISwitchAnimationAccessibleImageCarouselModelVolatile
} from './types'

import { getType, types } from 'mobx-state-tree'
import { isNumber } from 'radashi'
import { verify } from 'simple-common-utils'

import { INITIAL_SLIDE_POSITIONS } from '../../constants'

// eslint-disable-next-line id-length
export const SwitchAnimationAccessibleImageCarouselModel = types
  .model('SwitchAnimationAccessibleImageCarouselModel')
  .volatile<ISwitchAnimationAccessibleImageCarouselModelVolatile>(() => ({
    autoSwitchAnimationParams: {
      duration: 1000,
      preSwitchDelay: 1000
    },
    currentImageIndex: 0,
    imageData: [],
    isSwitchingStarted: false,
    slidePositions: [...INITIAL_SLIDE_POSITIONS]
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
    get switchDirectionSafe(): TSwitchDirection {
      verify(
        self.switchDirection,
        `'${getType(self).name}.switchDirectionSafe' can be accessed only when 'self.switchDirection' is not undefined`
      )

      return self.switchDirection
    }
  }))
  .actions(self => ({
    finalizeSwitch(this: void): void {
      self.currentImageIndex = self.getImageIndex(self.switchDirectionSafe)

      if (self.switchDirectionSafe === 'next') {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        self.slidePositions.unshift(self.slidePositions.pop()!)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        self.slidePositions.push(self.slidePositions.shift()!)
      }

      self.slidePositions = [...self.slidePositions]

      if (!self.isSwitchingStarted) {
        self.switchDirection = undefined
      }
    }
  }))

export interface ISwitchAnimationAccessibleImageCarouselModelInstance
  extends Instance<typeof SwitchAnimationAccessibleImageCarouselModel> {}
