import type { Instance } from 'mobx-state-tree'
import type { TAxis, TSlidePosition } from '../../types'
import type {
  ISlideTransitionAnimationAccessibleImageCarouselModelVolatile,
  TCarouselDimensionsKeys,
  TSlideDatum
} from './types'

import { types } from 'mobx-state-tree'
import { isNumber } from 'radashi'

import { getTransitionDirection } from './helpers'

// eslint-disable-next-line id-length
export const SlideTransitionAnimationAccessibleImageCarouselModel = types
  .model('SlideTransitionAnimationAccessibleImageCarouselModel')
  .volatile<ISlideTransitionAnimationAccessibleImageCarouselModelVolatile>(
    () => {
      const slideDatum: TSlideDatum = {
        current: 0,
        next: 0,
        previous: 0
      }

      return {
        imageData: [],
        isAutoTransitionStarted: false,
        isTransitionInProgress: false,
        slideData: {
          primary: slideDatum,
          secondary: slideDatum
        },
        slideDataSource: 'primary',
        transitionDirection: 'next'
      }
    }
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
    finishTransition(this: void, options?: unknown): void {
      self.isTransitionInProgress = false

      const transitionDirection = getTransitionDirection(
        options ?? self.transitionDirection
      )

      if (transitionDirection) {
        self.slideData.primary.current =
          self.slideData.primary[transitionDirection]

        self.slideData = { ...self.slideData }
      }
    }
  }))

export interface ISlideTransitionAnimationAccessibleImageCarouselModelInstance
  extends Instance<
    typeof SlideTransitionAnimationAccessibleImageCarouselModel
  > {}
