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
import type { IImageCarouselModelVolatile, TSourceData } from './types'

import { flow, getType, toGenerator } from 'mobx-state-tree'
import { isNumber } from 'radashi'
import { Image } from 'react-native'
import { verify } from 'simple-common-utils'

import { handleError } from '../handleError'
import { SlideTransitionAnimationAccessibleImageCarouselModel } from './SlideTransitionAnimationAccessibleImageCarouselModel'

export const ImageCarouselModel =
  SlideTransitionAnimationAccessibleImageCarouselModel.named(
    'ImageCarouselModel'
  )
    .volatile<IImageCarouselModelVolatile>(() => ({
      aspectRatio: 0
    }))
    .views(self => ({
      get canTransition(): boolean {
        return (
          Boolean(self.slideTransitionAnimation) &&
          !self.movementDirection &&
          !self.movementPhase &&
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          self.imageData.length > 1
        )
      },
      get isLoading(): boolean {
        const isLoaded = Boolean(self.aspectRatio && self.imageData.length)

        return !isLoaded
      },

      getImageData(this: void, index: number): ReadonlyDeep<TImageDatum> {
        const imageData = self.imageData.at(index)

        verify(
          imageData,
          `'${getType(self).name}.getImageData(${index})': 'imageData' is nullish, 'self.imageData.length' is ${self.imageData.length}`
        )

        return imageData
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
            self.aspectRatio = self.getImageData(0).aspectRatio
          }
        } catch (error) {
          handleError(error)
        }
      }),
      setPlaceholder(placeholder: React.ReactNode): void {
        self.placeholder = placeholder
      },
      setPlaceholderContainerStyle(
        placeholderContainerStyle: StyleProp<ViewStyle>
      ): void {
        self.placeholderContainerStyle = placeholderContainerStyle
      },
      setSlideTransitionAnimation(
        this: void,
        slideTransitionAnimation: BaseAnimation
      ): void {
        self.slideTransitionAnimation = slideTransitionAnimation
      },
      stopAutoTransition(this: void): void {
        self.isAutoTransitionStarted = false
      }
    }))
    .actions(self => ({
      startAutoTransition(
        this: void,
        movementDirection: TMovementDirection
      ): void {
        if (!self.isAutoTransitionStarted && self.move(movementDirection)) {
          self.isAutoTransitionStarted = true
        }
      }
    }))

export interface IImageCarouselModelInstance
  extends Instance<typeof ImageCarouselModel> {}
