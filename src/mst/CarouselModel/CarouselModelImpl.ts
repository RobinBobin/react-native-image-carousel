import type { TSlideId } from '../types'

import { CarouselModel } from './CarouselModel'
import { getTransitionDirection } from './helpers'

export const CarouselModelImpl = CarouselModel.named(
  'CarouselModelImpl'
).actions(self => ({
  _finishTransition(this: void, options?: unknown): void {
    self.isTransitionInProgress = false

    const transitionDirection = getTransitionDirection(
      options ?? self.transitionDirection
    )

    if (!transitionDirection) {
      return
    }

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

    self.slideGroupTransitionAnimation.reset({
      carouselDimensions: self.carouselDimensions,
      slideData: self.slideData
    })

    if (self.isAutoTransitionStarted) {
      requestAnimationFrame(() => self.move(self.transitionDirection))
    }
  }
}))
