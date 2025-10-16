import type { Instance } from 'mobx-state-tree'
import type { TAxis, TSlidePosition } from '../../types'
import type {
  ISlideTransitionAnimationAccessibleImageCarouselModelVolatile,
  TCarouselDimensionsKeys
} from './types'

import { types } from 'mobx-state-tree'
import { isNumber } from 'radashi'

import { getTransitionDirection } from './helpers'

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
      isAutoTransitionStarted: false,
      transitionDirection: 'next',
      transitionPhase: 'neutral'
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
    }
  }))
  .actions(self => ({
    finishTransitionPhase(this: void, options?: unknown): void {
      switch (self.transitionPhase) {
        case 'finished':
          self.transitionPhase = 'neutral'
          break

        case 'initiated': {
          const transitionDirection = getTransitionDirection(
            options ?? self.transitionDirection
          )

          if (!transitionDirection) {
            self.transitionPhase = 'neutral'

            break
          }

          self.imageDataIndices = {
            ...self.imageDataIndices,
            current: self.imageDataIndices[transitionDirection]
          }

          self.transitionPhase = 'finished'

          break
        }

        case 'neutral':
          self.transitionPhase = 'requested'
          break

        case 'requested':
          self.transitionPhase = 'initiated'
          break
      }
    }
  }))

export interface ISlideTransitionAnimationAccessibleImageCarouselModelInstance
  extends Instance<
    typeof SlideTransitionAnimationAccessibleImageCarouselModel
  > {}
