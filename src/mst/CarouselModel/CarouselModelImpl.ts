import type { Instance } from 'mobx-state-tree'
import type { TSlideDatum, TSlideId, TTransitionDirection } from '../types'
import type { TCarouselModelCommonActions } from './types'

import { zipToObject } from 'radashi'

import { getSlideDatum } from '../../slideTransitionAnimations'
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
      const isNext = transitionDirection === 'next'

      const slideDatumArray = Object.values(self.slideData).map<TSlideDatum>(
        slideDatum => {
          const minusOne = -1
          const step = isNext ? 1 : minusOne

          let imageDataIndex = slideDatum[1] + step

          if (imageDataIndex === minusOne) {
            imageDataIndex = self.imageData.length - 1
          } else if (imageDataIndex === self.imageData.length) {
            imageDataIndex = 0
          }

          return [slideDatum[0], imageDataIndex]
        }
      )

      if (isNext) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        slideDatumArray.unshift(slideDatumArray.pop()!)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        slideDatumArray.push(slideDatumArray.shift()!)
      }

      self.slideData = zipToObject<TSlideId, TSlideDatum>(
        Object.keys(self.slideData) as TSlideId[],
        slideDatumArray
      )
    }
  }))
  .actions<TCarouselModelCommonActions>(self => ({
    _onFinished(this: void): void {
      self.isTransitionRequested = false

      // hidden
      let imageDataIndex = getSlideDatum({
        slideData: self.slideData,
        slidePosition: 'current'
      })[1][1]

      self.imageVolatileData.get(imageDataIndex)?.callbacks?.onHidden?.()

      self._setSlideData(self.transitionDirection)

      // shown
      imageDataIndex = getSlideDatum({
        slideData: self.slideData,
        slidePosition: 'current'
      })[1][1]

      self.imageVolatileData.get(imageDataIndex)?.callbacks?.onShown?.()

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
