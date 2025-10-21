import type { TSlideId, TTransitionDirection } from '../types'

import { CarouselModel } from './CarouselModel'

export const CarouselModelImpl = CarouselModel.named('CarouselModelImpl')
  .actions(self => ({
    _moveIfAutoTransitionStarted(this: void): void {
      if (self.isAutoTransitionStarted) {
        requestAnimationFrame(() => self.move(self.transitionDirection))
      }
    },
    _prepare(this: void): void {
      self.slideGroupTransitionAnimation.prepare({
        carouselDimensions: self.carouselDimensions,
        slideData: self.slideData
      })
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
  .actions(self => ({
    _handleFling(this: void, flingDirection: TTransitionDirection): void {
      if (self.canTransition) {
        self.move(flingDirection)

        return
      }

      if (flingDirection !== self.transitionDirection) {
        // self.slideGroupTransitionAnimation.handleFling()
      }
    },
    _onFinished(this: void): void {
      self.isTransitionInProgress = false

      self._setSlideData(self.transitionDirection)
      self._prepare()
      self._moveIfAutoTransitionStarted()
    },
    _onFlinged(this: void, flingDirection: TTransitionDirection): void {
      if (self.canTransition) {
        self.move(flingDirection)

        return
      }

      if (flingDirection === self.transitionDirection) {
        return
      }

      self.isTransitionInProgress = false

      self._moveIfAutoTransitionStarted()
    }
  }))
