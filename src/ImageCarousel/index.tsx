import type { IImageCarouselProps } from './types'

import { observer } from 'mobx-react-lite'
import React from 'react'
import { View } from 'react-native'

import { onContainerLayout } from './helpers/onContainerLayout'
import { useSwitchAnimation } from './hooks/useSwitchAnimation'
import { Slide } from './Slide'
import { getContainerStyle } from './styles'

export const ImageCarousel: React.FC<IImageCarouselProps> = observer(
  ({ carouselModel }) => {
    useSwitchAnimation(carouselModel)

    const {
      aspectRatio,
      carouselDimensions,
      isLoading,
      placeholder,
      placeholderContainerStyle,
      setCarouselDimensions,
      slidePositions
    } = carouselModel

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
        {slidePositions.map(position => (
          <Slide
            carouselModel={carouselModel}
            key={position}
            position={position}
          />
        ))}
      </View>
    )
  }
)
