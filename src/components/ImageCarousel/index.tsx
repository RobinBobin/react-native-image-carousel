import type { ViewProps } from 'react-native'
import type { IComponentWithCarouselModelProps } from '../common/types'

import { observer } from 'mobx-react-lite'
import { pick } from 'radashi'
import React from 'react'
import { View } from 'react-native'

import { useSlideTransitionAnimation } from './hooks/useSlideTransitionAnimation'
import { Placeholder } from './Placeholder'
import { Slide } from './Slide'
import { getContainerStyle } from './styles'

const ImageCarousel: React.FC<IComponentWithCarouselModelProps> = observer(
  ({ carouselModel }) => {
    useSlideTransitionAnimation(carouselModel)

    const {
      aspectRatio,
      carouselDimensions,
      isLoading,
      setCarouselDimensions
    } = carouselModel

    const onLayout: ViewProps['onLayout'] = ({ nativeEvent: { layout } }) =>
      setCarouselDimensions(pick(layout, ['width', 'height']))

    return isLoading ?
        <Placeholder carouselModel={carouselModel} />
      : <View
          onLayout={onLayout}
          style={getContainerStyle(aspectRatio, carouselDimensions)}
        >
          <Slide carouselModel={carouselModel} position='current' />
          <Slide carouselModel={carouselModel} position='previous' />
          <Slide carouselModel={carouselModel} position='next' />
        </View>
  }
)

ImageCarousel.displayName = 'ImageCarousel'

export { ImageCarousel }
