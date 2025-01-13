import type { IImageCarouselProps } from './types'

import { observer } from 'mobx-react-lite'
import React from 'react'
import { View } from 'react-native'

import { NoAnimation } from '../switchAnimations/NoAnimation'
import { onContainerLayout } from './helpers/onContainerLayout'
import { Slide } from './Slide'
import { getContainerStyle } from './styles'

export const ImageCarousel: React.FC<IImageCarouselProps> = observer(
  ({ carouselModel }) => {
    const {
      isLoading,
      setSwitchAnimation,
      switchAnimation: switchAnimation_
    } = carouselModel

    let switchAnimation = switchAnimation_

    if (!switchAnimation) {
      switchAnimation = new NoAnimation(carouselModel)

      setSwitchAnimation(switchAnimation)
    }

    switchAnimation.useStyles()

    if (isLoading) {
      return null
    }

    const { aspectRatio, carouselDimensions, setCarouselDimensions } =
      carouselModel

    return (
      <View
        onLayout={onContainerLayout(setCarouselDimensions)}
        style={getContainerStyle(aspectRatio, carouselDimensions)}
      >
        <Slide carouselModel={carouselModel} position='previous' />
        <Slide carouselModel={carouselModel} position='current' />
        <Slide carouselModel={carouselModel} position='next' />
      </View>
    )
  }
)
