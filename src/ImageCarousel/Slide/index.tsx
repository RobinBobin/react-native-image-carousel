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
  const { getImageData, getImageIndex, switchAnimation } = carouselModel

  verify(
    switchAnimation,
    "No 'switchAnimation' set. Use 'NoAnimation' if you don't need any animation"
  )

  const animatedStyle = switchAnimation.getStyle(position)
  const imageIndex = getImageIndex(position)

  const { aspectRatio, backgroundColor, onPress, source } =
    getImageData(imageIndex)

  const onImagePress = (): void => {
    onPress?.({
      index: imageIndex,
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
