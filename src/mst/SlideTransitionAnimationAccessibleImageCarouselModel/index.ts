import type { Instance } from 'mobx-state-tree'
import type { TAxis, TSlidePosition } from '../../types'
import type {
  ISlideTransitionAnimationAccessibleImageCarouselModelVolatile,
  TCarouselDimensionsKeys
} from './types'

import { getType, types } from 'mobx-state-tree'
import { isNumber } from 'radashi'

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
      shouldUsePreTransitionDelay: true,
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
        case 'finalization':
          self.transitionPhase = 'neutral'
          break

        case 'initiation': {
          const shouldSetImageDataIndices = options as boolean

          if (shouldSetImageDataIndices) {
            self.imageDataIndices = {
              ...self.imageDataIndices,
              current: self.imageDataIndices[self.transitionDirection]
            }
          }

          self.transitionPhase =
            shouldSetImageDataIndices ? 'finalization' : 'neutral'

          break
        }

        case 'neutral':
        default:
          throw new Error(
            `'${getType(self).name}.finishTransitionPhase()': 'self.transitionPhase' can't be '${self.transitionPhase}'`
          )
      }
    }
  }))

export interface ISlideTransitionAnimationAccessibleImageCarouselModelInstance
  extends Instance<
    typeof SlideTransitionAnimationAccessibleImageCarouselModel
  > {}
