import type { Instance } from 'mobx-state-tree'
import type { TAxis, TSlidePosition } from '../../types'
import type {
  ISlideTransitionAnimationAccessibleImageCarouselModelVolatile,
  TCarouselDimensionsKeys,
  TSlideDataSource
} from './types'

import { types } from 'mobx-state-tree'
import { isNumber, objectify } from 'radashi'

import { SLIDE_DATA_SOURCES, SLIDE_POSITIONS } from '../../constants'
import { getTransitionDirection } from './helpers'

// eslint-disable-next-line id-length
export const SlideTransitionAnimationAccessibleImageCarouselModel = types
  .model('SlideTransitionAnimationAccessibleImageCarouselModel')
  .volatile<ISlideTransitionAnimationAccessibleImageCarouselModelVolatile>(
    () => ({
      imageData: [],
      isAutoTransitionStarted: false,
      isTransitionInProgress: false,
      slideData: objectify(
        SLIDE_DATA_SOURCES,
        slideDataSource => slideDataSource,
        () =>
          objectify(
            SLIDE_POSITIONS,
            slidePosition => slidePosition,
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            () => 0
          )
      ),
      slideDataSource: 'primary',
      transitionDirection: 'next'
    })
  )
  .views(self => ({
    get nextSlideDataSource(): TSlideDataSource {
      return self.slideDataSource === 'primary' ? 'secondary' : 'primary'
    },

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

      if (!transitionDirection) {
        return
      }

      const current = self.slideData[self.slideDataSource][transitionDirection]
      const offset = 1

      const [next, previous] = [offset, -offset].map(delta => {
        const result = (current + delta) % self.imageData.length

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return result < 0 ? self.imageData.length + result : result
      }) as [number, number]

      self.slideData = {
        ...self.slideData,
        [self.nextSlideDataSource]: { current, next, previous }
      }
    }
  }))

export interface ISlideTransitionAnimationAccessibleImageCarouselModelInstance
  extends Instance<
    typeof SlideTransitionAnimationAccessibleImageCarouselModel
  > {}
