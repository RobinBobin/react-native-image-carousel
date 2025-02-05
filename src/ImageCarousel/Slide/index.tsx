import type React from 'react'
import type { IImageCarouselModelInstance } from '../../mst'
import type { TSlidePosition } from '../../types'

import { Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { verify } from 'simple-common-utils'

import { getContainerStyle, getImageStyle } from './styles'

interface ISlideProps {
  carouselModel: IImageCarouselModelInstance
  position: TSlidePosition
}

export const Slide: React.FC<ISlideProps> = ({ carouselModel, position }) => {
  const { imageDataIndices, getImageData, slideTransitionAnimation } =
    carouselModel

  verify(slideTransitionAnimation, "No 'slideTransitionAnimation' set")

  const animatedStyle = slideTransitionAnimation.getStyle(position)
  const imageDataIndex = imageDataIndices[position]

  const { aspectRatio, backgroundColor, onPress, source } =
    getImageData(imageDataIndex)

  const onImagePress = (): void => {
    onPress?.({
      imageDataIndex,
      slidePosition: position
    })
  }

  return (
    <Animated.View style={[getContainerStyle(backgroundColor), animatedStyle]}>
      <TouchableWithoutFeedback onPress={onImagePress}>
        <Image source={source} style={getImageStyle(aspectRatio)} />
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}
