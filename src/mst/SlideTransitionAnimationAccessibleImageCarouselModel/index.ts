import type { Instance } from 'mobx-state-tree'
import type { TAxis, TSlidePosition } from '../../types'
import type {
  ISlideTransitionAnimationAccessibleImageCarouselModelVolatile,
  TCarouselDimensionsKeys,
  TSlideId
} from './types'

import { types } from 'mobx-state-tree'
import { isNumber, objectify } from 'radashi'

import { SLIDE_IDS } from '../../constants'
import { createSlideOverAnimation } from '../../slideTransitionAnimations'
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
        SLIDE_IDS,
        slideId => slideId,
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        () => ['current', 0]
      ),
      slidesTransitionAnimation: createSlideOverAnimation(),
      transitionDirection: 'next'
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
    setNextSlideData(this: void): void {
      const nextSlideData = { ...self.slideData }

      const slidePositions = Object.values(nextSlideData).map(
        ([slidePosition]) => slidePosition
      )

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      slidePositions.unshift(slidePositions.pop()!)

      Object.entries(nextSlideData).forEach(
        ([slideId, [, imageDataIndex]], index) => {
          nextSlideData[slideId as TSlideId] = [
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            slidePositions[index]!,
            imageDataIndex
          ]
        }
      )

      self.slideData = nextSlideData
    }
  }))
  .actions(self => ({
    reset(): void {
      self.slidesTransitionAnimation.reset({
        slide1: self.getSlideOffset('x', self.slideData.slide1[0]),
        slide2: self.getSlideOffset('x', self.slideData.slide2[0]),
        slide3: self.getSlideOffset('x', self.slideData.slide3[0])
      })
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

      self.setNextSlideData()

      self.reset()
    }
  }))

export interface ISlideTransitionAnimationAccessibleImageCarouselModelInstance
  extends Instance<
    typeof SlideTransitionAnimationAccessibleImageCarouselModel
  > {}
