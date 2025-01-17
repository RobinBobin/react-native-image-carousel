import type { Instance } from 'mobx-state-tree'
import type { TSlidePosition, TSwitchDirection } from '../../types'
import type {
  ICarouselNumberDimensions,
  ISwitchAnimationAccessibleImageCarouselModelVolatile
} from './types'

import { getType, types } from 'mobx-state-tree'
import { verify } from 'simple-common-utils'

import { INITIAL_SLIDE_POSITIONS } from '../../constants'
import { areCarouselNumberDimensionsReady } from './helpers/areCarouselNumberDimensionsReady'

// eslint-disable-next-line id-length
export const SwitchAnimationAccessibleImageCarouselModel = types
  .model('SwitchAnimationAccessibleImageCarouselModel')
  .volatile<ISwitchAnimationAccessibleImageCarouselModelVolatile>(() => ({
    currentImageIndex: 0,
    imageData: [],
    isSwitchingStarted: false,
    slidePositions: INITIAL_SLIDE_POSITIONS
  }))
  .views(self => ({
    get carouselNumberDimensions(): ICarouselNumberDimensions {
      verify(
        areCarouselNumberDimensionsReady(self.carouselDimensions),
        `'${getType(self).name}.carouselNumberDimensions' can be accessed only when 'self.carouselDimensions' number values are ready`
      )

      return self.carouselDimensions
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

      const [previousOrNext, current, nextOrPrevious] = self.slidePositions

      self.slidePositions = [previousOrNext, nextOrPrevious, current]

      if (!self.isSwitchingStarted) {
        self.switchDirection = undefined
      }
    }
  }))

export interface ISwitchAnimationAccessibleImageCarouselModelInstance
  extends Instance<typeof SwitchAnimationAccessibleImageCarouselModel> {}
