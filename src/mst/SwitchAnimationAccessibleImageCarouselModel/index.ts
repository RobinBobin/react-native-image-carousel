import type { Instance } from 'mobx-state-tree'
import type {
  TAxis,
  TSlidePosition,
  TSwitchDirection,
  TSwitchPhase
} from '../../types'
import type {
  ISwitchAnimationAccessibleImageCarouselModelVolatile,
  TCarouselDimensions
} from './types'

import { getType, types } from 'mobx-state-tree'
import { isNumber } from 'radashi'
import { verify } from 'simple-common-utils'

// eslint-disable-next-line id-length
export const SwitchAnimationAccessibleImageCarouselModel = types
  .model('SwitchAnimationAccessibleImageCarouselModel')
  .volatile<ISwitchAnimationAccessibleImageCarouselModelVolatile>(() => ({
    imageData: [],
    imageDataIndices: {
      current: 0,
      next: 0,
      previous: 0
    },
    isSwitchingStarted: false
  }))
  .views(self => ({
    getSlideOffset(axis: TAxis, slidePosition: TSlidePosition): number {
      if (slidePosition === 'current') {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return 0
      }

      const dimensionKey: keyof TCarouselDimensions =
        axis === 'x' ? 'width' : 'height'

      const dimension = self.carouselDimensions?.[dimensionKey]
      const veryBigNumber = 1_000_000
      const value = isNumber(dimension) ? dimension : veryBigNumber

      return slidePosition === 'next' ? value : -value
    },
    get switchDirectionVerified(): TSwitchDirection {
      verify(
        self.switchDirection,
        `'${getType(self).name}.switchDirectionVerified' can be accessed only when 'self.switchDirection' is not undefined`
      )

      return self.switchDirection
    },
    get switchPhaseVerified(): TSwitchPhase {
      verify(
        self.switchPhase,
        `'${getType(self).name}.switchPhaseVerified' can be accessed only when 'self.switchPhase' is not undefined`
      )

      return self.switchPhase
    }
  }))
  .actions(self => ({
    finalizeSwitch(this: void): void {
      switch (self.switchPhaseVerified) {
        case 'finalization':
          if (!self.isSwitchingStarted) {
            self.switchDirection = undefined
          }

          self.switchPhase = undefined

          break

        case 'initiation': {
          const { next, previous } = self.imageDataIndices

          self.imageDataIndices = {
            current: self.switchDirectionVerified === 'next' ? next : previous,
            next,
            previous
          }

          self.switchPhase = 'finalization'

          break
        }
      }
    }
  }))

export interface ISwitchAnimationAccessibleImageCarouselModelInstance
  extends Instance<typeof SwitchAnimationAccessibleImageCarouselModel> {}
