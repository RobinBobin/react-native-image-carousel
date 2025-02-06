import type { IImageCarouselProps } from './types'

import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { View } from 'react-native'

import { onContainerLayout } from './helpers/onContainerLayout'
import { useSlideTransitionAnimation } from './hooks/useSlideTransitionAnimation'
import { Slide } from './Slide'
import { getContainerStyle } from './styles'

const ImageCarousel: React.FC<IImageCarouselProps> = observer(
  ({ carouselModel }) => {
    const slideTransitionAnimation = useSlideTransitionAnimation(carouselModel)

    const {
      aspectRatio,
      carouselDimensions,
      isLoading,
      placeholder,
      placeholderContainerStyle,
      setCarouselDimensions,
      movementPhase
    } = carouselModel

    useEffect(() => {
      if (movementPhase) {
        slideTransitionAnimation.move()
      }
    }, [slideTransitionAnimation, movementPhase])

    if (isLoading) {
      return (
        <View
          style={[
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
