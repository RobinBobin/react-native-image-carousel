import type { Instance } from 'mobx-state-tree'
import type {
  TAxis,
  TMovementDirection,
  TMovementPhase,
  TSlidePosition
} from '../../types'
import type {
  ISlideTransitionAnimationAccessibleImageCarouselModelVolatile,
  TCarouselDimensionsKeys
} from './types'

import { getType, types } from 'mobx-state-tree'
import { isNumber } from 'radashi'
import { verify } from 'simple-common-utils'

// eslint-disable-next-line id-length
export const SlideTransitionAnimationAccessibleImageCarouselModel = types
  .model('SlideTransitionAnimationAccessibleImageCarouselModel')
  .volatile<ISlideTransitionAnimationAccessibleImageCarouselModelVolatile>(
    () => ({
      imageData: [],
      imageDataIndices: {
        current: 0,
        next: 0,
        previous: 0
      },
      isAutoTransitionStarted: false
    })
  )
  .views(self => ({
    getSlideOffset(axis: TAxis, slidePosition: TSlidePosition): number {
      if (slidePosition === 'current') {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return 0
      }

      const dimensionKey: TCarouselDimensionsKeys =
        axis === 'x' ? 'width' : 'height'

      const dimension = self.carouselDimensions?.[dimensionKey]
      const veryBigNumber = 1_000_000
      const value = isNumber(dimension) ? dimension : veryBigNumber

      return slidePosition === 'next' ? value : -value
    },
    get movementDirectionVerified(): TMovementDirection {
      verify(
        self.movementDirection,
        `'${getType(self).name}.movementDirectionVerified' can be accessed only when 'self.movementDirection' is not undefined`
      )

      return self.movementDirection
    },
    get movementPhaseVerified(): TMovementPhase {
      verify(
        self.movementPhase,
        `'${getType(self).name}.movementPhaseVerified' can be accessed only when 'self.movementPhase' is not undefined`
      )

      return self.movementPhase
    }
  }))
  .actions(self => ({
    finalizeTransition(this: void): void {
      switch (self.movementPhaseVerified) {
        case 'finalization':
          if (!self.isAutoTransitionStarted) {
            self.movementDirection = undefined
          }

          self.movementPhase = undefined

          break

        case 'initiation': {
          self.imageDataIndices = {
            ...self.imageDataIndices,
            current: self.imageDataIndices[self.movementDirectionVerified]
          }

          self.movementPhase = 'finalization'

          break
        }
      }
    }
  }))

export interface ISlideTransitionAnimationAccessibleImageCarouselModelInstance
  extends Instance<
    typeof SlideTransitionAnimationAccessibleImageCarouselModel
  > {}
