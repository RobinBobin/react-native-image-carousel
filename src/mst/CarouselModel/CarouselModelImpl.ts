import type { Instance } from 'mobx-state-tree'
import type { TSlideId, TTransitionDirection } from '../types'
import type { TCarouselModelCommonActions } from './types'

import { CarouselModel } from './CarouselModel'

export const CarouselModelImpl = CarouselModel.named('CarouselModelImpl')
  .actions(self => ({
    _handleFling(this: void, flingDirection: TTransitionDirection): void {
      if (!self.slideGroupTransitionAnimation.isAnimationInProgress) {
        self.move(flingDirection)

        return
      }

      if (flingDirection !== self.transitionDirection) {
        self.slideGroupTransitionAnimation.cancelInProgressAnimation()
      }
    },
    _moveIfAutoTransitionStarted(this: void): void {
      if (self.isAutoTransitionStarted) {
        requestAnimationFrame(() => self.move(self.transitionDirection))
      }
    },
    _setSlideData(this: void, transitionDirection: TTransitionDirection): void {
      const nextSlideData = { ...self.slideData }

      const slidePositions = Object.values(nextSlideData).map(
        ([slidePosition]) => slidePosition
      )

      if (transitionDirection === 'next') {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        slidePositions.unshift(slidePositions.pop()!)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        slidePositions.push(slidePositions.shift()!)
      }

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
  .actions<TCarouselModelCommonActions>(self => ({
    _onFinished(this: void): void {
      self.isTransitionRequested = false

      self._setSlideData(self.transitionDirection)

      self.slideGroupTransitionAnimation.prepare()

      self._moveIfAutoTransitionStarted()
    },
    // eslint-disable-next-line id-length
    _onInProgressAnimationCancelled(this: void): void {
      self.isTransitionRequested = false

      self._moveIfAutoTransitionStarted()
    }
  }))

export interface ICarouselModelImplInstance
  extends Instance<typeof CarouselModelImpl> {}
