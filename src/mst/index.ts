import type { Instance } from 'mobx-state-tree'
import type { ReadonlyDeep } from 'type-fest'
import type { BaseAnimation } from '../switchAnimations'
import type { TSlidePosition, TSwitchDirection } from '../types'
import type {
  TCarouselDimensions,
  TImageDatum,
  TImageRawData
} from './SwitchAnimationAccessibleImageCarouselModel/types'
import type { IImageCarouselModelVolatile, TSourceData } from './types'

import { flow, getType, toGenerator } from 'mobx-state-tree'
import { isNumber } from 'radashi'
import { Image } from 'react-native'
import { verify } from 'simple-common-utils'

import { handleError } from '../handleError'
import { SwitchAnimationAccessibleImageCarouselModel } from './SwitchAnimationAccessibleImageCarouselModel'
import { areCarouselNumberDimensionsReady } from './SwitchAnimationAccessibleImageCarouselModel/helpers/areCarouselNumberDimensionsReady'

export const ImageCarouselModel =
  SwitchAnimationAccessibleImageCarouselModel.named('ImageCarouselModel')
    .volatile<IImageCarouselModelVolatile>(() => ({
      aspectRatio: 0
    }))
    .views(self => ({
      get canSwitch(): boolean {
        return (
          areCarouselNumberDimensionsReady(self.carouselDimensions) &&
          Boolean(self.switchAnimation)
        )
      },
      get isLoading(): boolean {
        const isLoaded = Boolean(self.aspectRatio && self.imageData.length)

        return !isLoaded
      },

      getImageData(
        this: void,
        indexOrSlidePosition: number | TSlidePosition
      ): Readonly<TImageDatum> {
        const index =
          isNumber(indexOrSlidePosition) ? indexOrSlidePosition : (
            self.getImageIndex(indexOrSlidePosition)
          )

        const imageData = self.imageData[index]

        verify(
          imageData,
          `${getType(self).name}.getImageData(${index}): valid indices: [0, ${self.imageData.length}]`
        )

        return imageData
      }
    }))
    // eslint-disable-next-line max-lines-per-function
    .actions(self => ({
      setAspectRatio(this: void, aspectRatio: number): void {
        self.aspectRatio = aspectRatio
      },
      setCarouselDimensions(
        this: void,
        carouselDimensions: ReadonlyDeep<TCarouselDimensions>
      ): void {
        self.carouselDimensions = carouselDimensions
      },
      setImageData: flow(function* (
        imageData: ReadonlyDeep<TImageRawData>
      ): Generator<Promise<TSourceData[]>, void> {
        try {
          verify(
            imageData.length,
            `${getType(self).name}.setImageData(): 'imageData' can't be empty`
          )

          const promises = imageData.map(({ source, ...rest }) =>
            isNumber(source) ?
              Promise.resolve<TSourceData>(
                Image.resolveAssetSource(source)
                // eslint-disable-next-line promise/prefer-await-to-then
              ).then(resolvedAssetSource => ({
                ...resolvedAssetSource,
                ...rest
              }))
              // eslint-disable-next-line promise/prefer-await-to-then
            : Image.getSize(source).then(size => ({
                ...rest,
                ...size,
                uri: source
              }))
          )

          const sourceData = yield* toGenerator(Promise.all(promises))

          // We can deal with either one image or more than 2.
          const lengthToFix = 2

          if (sourceData.length === lengthToFix) {
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers, @typescript-eslint/no-non-null-assertion
            sourceData.unshift(sourceData.at(-1)!)
          }

          self.imageData = sourceData.map(({ height, uri, width, ...rest }) => {
            const hasHeightAndWidth = isNumber(height) && isNumber(width)

            verify(
              hasHeightAndWidth,
              `${getType(self).name}.setImageData(): no width or height for '${uri}'`
            )

            return {
              ...rest,
              aspectRatio: width / height,
              source: { uri }
            }
          })

          if (!self.aspectRatio) {
            self.aspectRatio = self.getImageData(0).aspectRatio
          }
        } catch (error) {
          handleError(error)
        }
      }),
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      setSwitchAnimation(this: void, switchAnimaiton: BaseAnimation): void {
        self.switchAnimation = switchAnimaiton
      },
      stopSwitching(this: void): void {
        self.isSwitchingStarted = false
      },
      switch(this: void, switchDirection: TSwitchDirection): void {
        if (!self.canSwitch) {
          return
        }

        self.slidePositions = [
          switchDirection === 'next' ? 'previous' : 'next',
          'current',
          switchDirection
        ]

        self.switchDirection = switchDirection

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        self.switchAnimation!.switch()
      }
    }))
    .actions(self => ({
      startSwitching(this: void, switchDirection: TSwitchDirection): void {
        if (self.isSwitchingStarted) {
          return
        }

        self.isSwitchingStarted = true

        self.switch(switchDirection)
      }
    }))

export interface IImageCarouselModelInstance
  extends Instance<typeof ImageCarouselModel> {}
