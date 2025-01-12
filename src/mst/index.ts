import type { Instance } from 'mobx-state-tree'
import type { ReadonlyDeep } from 'type-fest'
import type {
  IImageCarouselModelVolatile,
  TElementPosition,
  TImageDatum,
  TImageRawData,
  TSourceData
} from './types'

import { flow, getType, toGenerator, types } from 'mobx-state-tree'
import { isNumber } from 'radashi'
import { Image } from 'react-native'
import { verify } from 'simple-common-utils'

import { handleError } from '../handleError'
import { AutoscrollAnimationParamsModel } from './AutoscrollAnimationParams'

export const ImageCarouselModel = types
  .model('ImageCarouselModel', {
    autoscrollAnimationParams: types.optional(
      AutoscrollAnimationParamsModel,
      {}
    )
  })
  .volatile<IImageCarouselModelVolatile>(() => ({
    aspectRatio: 0,
    carouselWidth: 0,
    currentImageIndex: 0,
    imageData: [],
    isAutoscrollEnabled: true
  }))
  .views(self => ({
    get isLoading(): boolean {
      const isLoaded = self.aspectRatio && self.imageData.length

      return !isLoaded
    },

    getImageDataByIndex(index: number): Readonly<TImageDatum> {
      const imageData = self.imageData[index]

      verify(
        imageData,
        `${getType(self).name}.getImageData(${index}): valid indices: [0, ${self.imageData.length}]`
      )

      return imageData
    },
    getImageIndex(this: void, position: TElementPosition): number {
      switch (position) {
        case 'current':
          return self.currentImageIndex

        case 'next': {
          const canIncrement =
            self.currentImageIndex < self.imageData.length - 1

          return canIncrement ? self.currentImageIndex + 1 : 0
        }
      }

      // @ts-expect-error Unreachable code detected.
      verify(
        false,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${getType(self).name}.getImageIndex()\nunknown position: ${position}`
      )

      // @ts-expect-error Unreachable code detected.
      return 0
    }
  }))
  .views(self => ({
    getImageData(
      this: void,
      position: TElementPosition
    ): Readonly<TImageDatum> {
      return self.getImageDataByIndex(self.getImageIndex(position))
    }
  }))
  /* eslint max-lines-per-function: ['error', { max: 70 }] */
  .actions(self => ({
    move(this: void, position: TElementPosition): void {
      self.currentImageIndex = self.getImageIndex(position)
    },
    reset(): void {
      self.aspectRatio = 0
      self.currentImageIndex = 0

      self.imageData = []
    },
    setAspectRatio(aspectRatio: number): void {
      self.aspectRatio = aspectRatio
    },
    setCarouselWidth(this: void, carouselWidth: number): void {
      self.carouselWidth = carouselWidth
    },
    setImageData: flow(function* (
      imageData: ReadonlyDeep<TImageRawData>
    ): Generator<Promise<TSourceData[]>, void> {
      try {
        verify(
          imageData.length,
          `${getType(self).name}.setSource(): 'imageData' can't be empty`
        )

        const promises = imageData.map(({ source, ...rest }) =>
          isNumber(source) ?
            // eslint-disable-next-line promise/prefer-await-to-then
            Promise.resolve<TSourceData>(Image.resolveAssetSource(source)).then(
              resolvedAssetSource => ({
                ...resolvedAssetSource,
                ...rest
              })
            )
            // eslint-disable-next-line promise/prefer-await-to-then
          : Image.getSize(source).then(size => ({
              ...rest,
              ...size,
              uri: source
            }))
        )

        const sourceData = yield* toGenerator(Promise.all(promises))

        self.imageData = sourceData.map(({ height, uri, width, ...rest }) => {
          const hasHeightAndWidth = isNumber(height) && isNumber(width)

          verify(
            hasHeightAndWidth,
            `${getType(self).name}.setSource(): no width or height for '${uri}'`
          )

          return {
            ...rest,
            aspectRatio: width / height,
            source: { uri }
          }
        })

        if (!self.aspectRatio) {
          self.aspectRatio = self.getImageDataByIndex(0).aspectRatio
        }
      } catch (error) {
        handleError(error)
      }
    }),
    setIsAutoscrollEnabled(isAutoscrollEnabled: boolean): void {
      self.isAutoscrollEnabled = isAutoscrollEnabled
    }
  }))

export interface IImageCarouselModelInstance
  extends Instance<typeof ImageCarouselModel> {}
