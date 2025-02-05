import type { IImageCarouselProps } from './types'

import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { View } from 'react-native'

import { onContainerLayout } from './helpers/onContainerLayout'
import { useSwitchAnimation } from './hooks/useSwitchAnimation'
import { Slide } from './Slide'
import { getContainerStyle } from './styles'

export const ImageCarousel: React.FC<IImageCarouselProps> = observer(
  ({ carouselModel }) => {
    const switchAnimation = useSwitchAnimation(carouselModel)

    const {
      aspectRatio,
      carouselDimensions,
      isLoading,
      placeholder,
      placeholderContainerStyle,
      setCarouselDimensions,
      switchPhase
    } = carouselModel

    useEffect(() => {
      if (switchPhase) {
        switchAnimation.switch()
      }
    }, [switchAnimation, switchPhase])

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
