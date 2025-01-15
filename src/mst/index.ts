import type { Instance } from 'mobx-state-tree'
import type { ReadonlyDeep } from 'type-fest'
import type {
  ISwitchAnimation,
  TSwitchAnimationFactory
} from '../switchAnimations/types'
import type { TSlidePosition, TSwitchDirection } from '../types'
import type {
  IAutoSwitchAnimationParams,
  TCarouselDimensions,
  TImageDatum,
  TImageRawData
} from './SwitchAnimationAccessibleImageCarouselModel/types'
import type { IImageCarouselModelVolatile, TSourceData } from './types'

import { flow, getType, toGenerator } from 'mobx-state-tree'
import { isFunction, isNumber } from 'radashi'
import { Image } from 'react-native'
import { verify } from 'simple-common-utils'

import { INITIAL_SLIDE_POSITIONS } from '../constants'
import { handleError } from '../handleError'
import { SwitchAnimationAccessibleImageCarouselModel } from './SwitchAnimationAccessibleImageCarouselModel'

export const ImageCarouselModel =
  SwitchAnimationAccessibleImageCarouselModel.named('ImageCarouselModel')
    .volatile<IImageCarouselModelVolatile>(() => ({
      aspectRatio: 0,
      isAutoSwitchEnabled: true
    }))
    .views(self => ({
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
      setAutoSwitchAnimationParams(
        autoSwitchAnimationParams: Readonly<Partial<IAutoSwitchAnimationParams>>
      ): void {
        const newParams = { ...autoSwitchAnimationParams }

        const keys = Object.keys(
          self.autoSwitchAnimationParams
        ) as (keyof IAutoSwitchAnimationParams)[]

        keys.forEach(key => {
          if (!(key in newParams)) {
            newParams[key] = self.autoSwitchAnimationParams[key]
          }
        })

        self.autoSwitchAnimationParams = newParams as IAutoSwitchAnimationParams
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
      setIsAutoSwitchEnabled(this: void, isAutoSwitchEnabled: boolean): void {
        self.isAutoSwitchEnabled = isAutoSwitchEnabled
      },
      setSwitchAnimation(
        this: void,
        FactoryOrInstance: TSwitchAnimationFactory | Readonly<ISwitchAnimation>
      ): void {
        self.switchAnimation =
          isFunction(FactoryOrInstance) ?
            new FactoryOrInstance(self)
          : FactoryOrInstance
      },
      stopSwitching(this: void): void {
        self.isSwitchingStarted = false
      },
      switch(this: void, switchDirection: TSwitchDirection = 'next'): void {
        if (!(self.carouselNumberDimensions && self.switchAnimation)) {
          return
        }

        self.slidePositions = [...INITIAL_SLIDE_POSITIONS]

        self.switchDirection = switchDirection

        self.switchAnimation.switch()
      }
    }))
    .actions(self => ({
      startSwitching(
        this: void,
        switchDirection: TSwitchDirection = 'next'
      ): void {
        if (self.isSwitchingStarted) {
          return
        }

        self.isSwitchingStarted = true

        self.switch(switchDirection)
      }
    }))

export interface IImageCarouselModelInstance
  extends Instance<typeof ImageCarouselModel> {}
