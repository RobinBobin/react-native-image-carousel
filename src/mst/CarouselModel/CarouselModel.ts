import type { Instance } from 'mobx-state-tree'
import type { StyleProp, ViewStyle } from 'react-native'
import type { ReadonlyDeep } from 'type-fest'
import type { TRSlideGroupTransitionAnimation } from '../../slideTransitionAnimations'
import type { TTransitionDirection } from '../types'
import type {
  ICarouselModelCommonViews,
  ICarouselModelCommonVolatile,
  ICarouselModelVolatile,
  TCarouselModelCommonActions,
  TImageDatum,
  TRawImageData,
  TRCarouselDimensions,
  TRImageVolatileData,
  TSlideSize,
  TSourceData
} from './types'

import { flow, getType, toGenerator, types } from 'mobx-state-tree'
import { isNumber, objectify } from 'radashi'
import { Image } from 'react-native'
import { verify } from 'simple-common-utils'

import { handleError } from '../../helpers/handleError'
import { createSlideOverAnimation } from '../../slideTransitionAnimations'
import { SLIDE_IDS } from '../constants'
import { isNumericHeightAndWidth } from './helpers'

export const CarouselModel = types
  .model('CarouselModel')
  .volatile<ICarouselModelCommonVolatile>(() => ({
    isAutoTransitionStarted: false,
    slideData: objectify(
      SLIDE_IDS,
      slideId => slideId,
      () => ['current', 0]
    ),
    transitionDirection: 'next'
  }))
  .actions<TCarouselModelCommonActions>(() => ({
    _onFinished(this: void): void {
      throw new Error('Must be subclassed')
    },
    // eslint-disable-next-line id-length
    _onInProgressAnimationCancelled(this: void): void {
      throw new Error('Must be subclassed')
    }
  }))
  .views<ICarouselModelCommonViews>(self => ({
    get reversedTransitionDirection(): TTransitionDirection {
      return self.transitionDirection === 'next' ? 'previous' : 'next'
    }
  }))
  .volatile<ICarouselModelVolatile>(self => ({
    aspectRatio: 0,
    imageData: [],
    imageGap: 0,
    imageVolatileData: new Map(),
    isSlideCentered: true,
    isSnapEnabled: false,
    isTransitionRequested: false,
    slideGroupTransitionAnimation: createSlideOverAnimation(self),
    slideSize: 'wholeCarousel'
  }))
  .views(self => ({
    get canTransition(): boolean {
      return self.imageData.length > 1 && !self.isTransitionRequested
    },

    getImageDatum(this: void, index: number): ReadonlyDeep<TImageDatum> {
      const imageDatum = self.imageData.at(index)

      verify(
        imageDatum,
        `'${getType(self).name}.getImageDatum(${index})': 'imageDatum' is nullish, 'self.imageData.length' is ${self.imageData.length}`
      )

      return imageDatum
    },
    get isLoading(): boolean {
      const isLoaded = Boolean(self.aspectRatio && self.imageData.length)

      return !isLoaded
    }
  }))
  .views(self => ({
    get canStartAutoTransition(): boolean {
      return !self.isAutoTransitionStarted && self.canTransition
    }
  }))
  // eslint-disable-next-line max-lines-per-function
  .actions(self => ({
    move(this: void, transitionDirection: TTransitionDirection): boolean {
      if (!self.canTransition) {
        return false
      }

      self.isTransitionRequested = true
      self.transitionDirection = transitionDirection

      self.slideGroupTransitionAnimation.animate()

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
      carouselDimensions: TRCarouselDimensions<false>
    ): void {
      if (isNumericHeightAndWidth(self.carouselDimensions)) {
        return
      }

      self.carouselDimensions = carouselDimensions

      self.slideGroupTransitionAnimation.prepare()
    },
    setImageData: flow(function* (
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      imageData: TRawImageData
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
          self.aspectRatio = self.getImageDatum(0).aspectRatio
        }

        self.slideData = {
          slide1: ['previous', self.imageData.length - 1],
          slide2: ['current', 0],
          slide3: ['next', 1]
        }
      } catch (error) {
        handleError(error)
      }
    }),
    setImageGap(this: void, imageGap: number): void {
      self.imageGap = imageGap
    },
    setImageVolatileData(
      this: void,
      imageIndex: number,
      imageVolatileData: TRImageVolatileData
    ): void {
      self.imageVolatileData.set(imageIndex, imageVolatileData)
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
    // eslint-disable-next-line id-length
    setSlideGroupTransitionAnimation(
      this: void,
      slideGroupTransitionAnimation: TRSlideGroupTransitionAnimation
    ): void {
      self.slideGroupTransitionAnimation = slideGroupTransitionAnimation
    },
    setSlideSize(this: void, slideSize: TSlideSize): void {
      self.slideSize = slideSize
    },
    setStyle(style: StyleProp<ViewStyle>): void {
      self.style = style
    },
    stopAutoTransition(this: void): void {
      self.isAutoTransitionStarted = false
    }
  }))
  .actions(self => ({
    startAutoTransition(
      this: void,
      transitionDirection: TTransitionDirection
    ): boolean {
      if (!self.canStartAutoTransition || !self.move(transitionDirection)) {
        return false
      }

      self.isAutoTransitionStarted = true

      return true
    }
  }))

export interface ICarouselModelInstance
  extends Instance<typeof CarouselModel> {}
