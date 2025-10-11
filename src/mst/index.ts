import type { Instance } from 'mobx-state-tree'
import type { StyleProp, ViewStyle } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'
import type { BaseAnimation } from '../slideTransitionAnimations'
import type { TMovementDirection } from '../types'
import type {
  TCarouselDimensions,
  TImageDatum,
  TImageRawData
} from './SlideTransitionAnimationAccessibleImageCarouselModel/types'
import type {
  IImageCarouselModelVolatile,
  TSlideSize,
  TSourceData
} from './types'

import { flow, getType, toGenerator } from 'mobx-state-tree'
import { isNumber } from 'radashi'
import { Image } from 'react-native'
import { verify } from 'simple-common-utils'

import { handleError } from '../helpers/handleError'
import { isNumericHeightAndWidth } from '../helpers/mst/isNumericHeightAndWidth'
import { SlideTransitionAnimationAccessibleImageCarouselModel } from './SlideTransitionAnimationAccessibleImageCarouselModel'

export const ImageCarouselModel =
  SlideTransitionAnimationAccessibleImageCarouselModel.named(
    'ImageCarouselModel'
  )
    .volatile<IImageCarouselModelVolatile>(() => ({
      aspectRatio: 0,
      imageGap: 0,
      isAutoTransitionStarted: false,
      isHorizontal: true,
      isSlideCentered: true,
      isSnapEnabled: false,
      slideSize: 'wholeCarousel'
    }))
    .views(self => ({
      get canTransition(): boolean {
        return (
          Boolean(self.slideTransitionAnimation) &&
          !self.movementPhase &&
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          self.imageData.length > 1
        )
      },
      get isLoading(): boolean {
        const isLoaded = Boolean(self.aspectRatio && self.imageData.length)

        return !isLoaded
      },

      getImageDatum(this: void, index: number): ReadonlyDeep<TImageDatum> {
        const imageData = self.imageData.at(index)

        verify(
          imageData,
          `'${getType(self).name}.getImageData(${index})': 'imageData' is nullish, 'self.imageData.length' is ${self.imageData.length}`
        )

        return imageData
      }
    }))
    .views(self => ({
      get canStartAutoTransition(): boolean {
        return !self.isAutoTransitionStarted && self.canTransition
      }
    }))
    // eslint-disable-next-line max-lines-per-function
    .actions(self => ({
      move(this: void, movementDirection: TMovementDirection): boolean {
        if (!self.canTransition) {
          return false
        }

        self.movementDirection = movementDirection

        const { current } = self.imageDataIndices
        const offset = 1

        const [next, previous] = [offset, -offset].map(delta => {
          const result = (current + delta) % self.imageData.length

          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          return result < 0 ? self.imageData.length + result : result
        }) as [number, number]

        self.imageDataIndices = { current, next, previous }
        self.movementPhase = 'initiation'

        return true
      },
      resetCarouselDimensions(this: void): void {
        self.carouselDimensions = undefined
      },
      setAspectRatio(this: void, aspectRatio: number): void {
        self.aspectRatio = aspectRatio
      },
      setCarouselDimensions(
        this: void,
        carouselDimensions: ReadonlyDeep<TCarouselDimensions>
      ): void {
        if (!isNumericHeightAndWidth(self.carouselDimensions)) {
          self.carouselDimensions = carouselDimensions
        }
      },
      setImageData: flow(function* (
        imageData: TImageRawData
      ): Generator<Promise<TSourceData[]>, void> {
        try {
          verify(
            imageData.length,
            `'${getType(self).name}.setImageData()': 'imageData' can't be empty`
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

          let sourceData = yield* toGenerator(Promise.all(promises))

          // We can deal with either one image or more than 2.
          const lengthToFix = 2

          if (sourceData.length === lengthToFix) {
            sourceData = [...sourceData, ...sourceData]
          }

          self.imageData = sourceData.map(({ height, uri, width, ...rest }) => {
            verify(
              isNumericHeightAndWidth(height, width),
              `'${getType(self).name}.setImageData()': no width or height for '${uri}'`
            )

            return {
              ...rest,
              aspectRatio: width / height,
              source: { uri }
            }
          })

          if (!self.aspectRatio) {
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            self.aspectRatio = self.getImageDatum(0).aspectRatio
          }
        } catch (error) {
          handleError(error)
        }
      }),
      setImageGap(this: void, imageGap: number): void {
        self.imageGap = imageGap
      },
      setIsHorizontal(this: void, isHorizontal: boolean): void {
        self.isHorizontal = isHorizontal
      },
      setIsSlideCentered(this: void, isSlideCentered: boolean): void {
        self.isSlideCentered = isSlideCentered
      },
      setIsSnapEnabled(this: void, isSnapEnabled: boolean): void {
        self.isSnapEnabled = isSnapEnabled
      },
      setPlaceholder(this: void, placeholder: React.ReactNode): void {
        self.placeholder = placeholder
      },
      setPlaceholderContainerStyle(
        this: void,
        placeholderContainerStyle: StyleProp<ViewStyle>
      ): void {
        self.placeholderContainerStyle = placeholderContainerStyle
      },
      setSlideSize(this: void, slideSize: TSlideSize): void {
        self.slideSize = slideSize
      },
      setSlideTransitionAnimation(
        this: void,
        slideTransitionAnimation: BaseAnimation
      ): void {
        self.slideTransitionAnimation = slideTransitionAnimation
      },
      setStyle(style: StyleProp<ViewStyle>): void {
        self.style = style
      },
      stopAutoTransition(this: void): void {
        self.isAutoTransitionStarted = false
        self.shouldUsePreTransitionDelay = true
      }
    }))
    .actions(self => {
      const baseFinalizeTransition = self.finalizeTransition

      return {
        finalizeTransition(this: void): void {
          baseFinalizeTransition()

          if (self.isAutoTransitionStarted && !self.movementPhase) {
            self.shouldUsePreTransitionDelay = true

            self.move(self.movementDirectionVerified)
          }
        },
        startAutoTransition(
          this: void,
          movementDirection: TMovementDirection
        ): boolean {
          if (!self.canStartAutoTransition || !self.move(movementDirection)) {
            return false
          }

          self.isAutoTransitionStarted = true
          self.shouldUsePreTransitionDelay = false

          return true
        }
      }
    })

export interface IImageCarouselModelInstance
  extends Instance<typeof ImageCarouselModel> {}
