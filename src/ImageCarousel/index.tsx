import type { IImageCarouselProps } from './types'

import { observer } from 'mobx-react-lite'
import React from 'react'
import { View } from 'react-native'

import { onContainerLayout } from './helpers/onContainerLayout'
import { useSlideTransitionAnimation } from './hooks/useSlideTransitionAnimation'
import { Slide } from './Slide'
import styles, { getContainerStyle } from './styles'

const ImageCarousel: React.FC<IImageCarouselProps> = observer(
  ({ carouselModel }) => {
    useSlideTransitionAnimation(carouselModel)

    const {
      aspectRatio,
      carouselDimensions,
      isLoading,
      placeholder,
      placeholderContainerStyle,
      setCarouselDimensions
    } = carouselModel

    if (isLoading) {
      return (
        <View
          style={[
            styles.defaultPlaceholderContainer,
            placeholderContainerStyle,
            { ...carouselDimensions, aspectRatio }
          ]}
        >
          {placeholder}
        </View>
      )
    }

    return (
      <View
        onLayout={onContainerLayout(setCarouselDimensions)}
        style={getContainerStyle(aspectRatio, carouselDimensions)}
      >
        <Slide carouselModel={carouselModel} position='current' />
        <Slide carouselModel={carouselModel} position='previous' />
        <Slide carouselModel={carouselModel} position='next' />
      </View>
    )
  }
)

ImageCarousel.displayName = 'ImageCarousel'

export { ImageCarousel }
