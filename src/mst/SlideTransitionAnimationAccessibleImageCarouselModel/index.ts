import type { Instance } from 'mobx-state-tree'
import type {
  TAxis,
  TSlidePosition,
  TTransitionDirection,
  TTransitionPhase
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
      shouldUsePreTransitionDelay: true
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
    get transitionDirectionVerified(): TTransitionDirection {
      verify(
        self.transitionDirection,
        `'${getType(self).name}.transitionDirectionVerified' can be accessed only when 'self.transitionDirection' is not undefined`
      )

      return self.transitionDirection
    },
    get transitionPhaseVerified(): TTransitionPhase {
      verify(
        self.transitionPhase,
        `'${getType(self).name}.transitionPhaseVerified' can be accessed only when 'self.transitionPhase' is not undefined`
      )

      return self.transitionPhase
    }
  }))
  .actions(self => ({
    finalizeTransition(this: void): void {
      switch (self.transitionPhaseVerified) {
        case 'finalization':
          self.transitionPhase = undefined
          break

        case 'initiation': {
          self.imageDataIndices = {
            ...self.imageDataIndices,
            current: self.imageDataIndices[self.transitionDirectionVerified]
          }

          self.transitionPhase = 'finalization'

          break
        }
      }
    }
  }))

export interface ISlideTransitionAnimationAccessibleImageCarouselModelInstance
  extends Instance<
    typeof SlideTransitionAnimationAccessibleImageCarouselModel
  > {}
