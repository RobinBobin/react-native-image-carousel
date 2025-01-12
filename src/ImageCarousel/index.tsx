import type { TElementPosition } from '../mst/types'
import type { IImageCarouselProps } from './types'

import { observer } from 'mobx-react-lite'
import React from 'react'
import { Image, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

import { onContainerLayout } from './helpers/onContainerLayout'
import { useAutoscrollAnimation } from './hooks/useAutoscrollAnimation'
import { getImageContainerStyle, getImageStyle } from './styles'

export const ImageCarousel: React.FC<IImageCarouselProps> = observer(
  ({ carouselModel }) => {
    const animatedImageStyle = useAutoscrollAnimation(carouselModel)

    const { isLoading } = carouselModel

    if (isLoading) {
      return null
    }

    const { aspectRatio, getImageData, getImageIndex, setCarouselWidth } =
      carouselModel

    const onImagePress = (position: TElementPosition): (() => void) => {
      return () => {
        const { onPress } = getImageData(position)

        onPress?.(getImageIndex(position))
      }
    }

    return (
      <View
        onLayout={onContainerLayout(setCarouselWidth)}
        style={getImageContainerStyle(aspectRatio)}
      >
        <TouchableWithoutFeedback onPress={onImagePress('current')}>
          <Image
            source={getImageData('current').source}
            style={getImageStyle(aspectRatio)}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onImagePress('next')}>
          <Animated.Image
            source={getImageData('next').source}
            style={[getImageStyle(aspectRatio), animatedImageStyle]}
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
)
