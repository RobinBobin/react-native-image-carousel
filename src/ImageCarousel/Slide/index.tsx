import type React from 'react'
import type { ViewStyle } from 'react-native'
import type { IImageCarouselModelInstance } from '../../mst'
import type { TSlidePosition } from '../../types'

import { Image } from 'expo-image'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { verify } from 'simple-common-utils'

import { getContainerStyle, getImageStyle } from './styles'

interface ISlideProps {
  carouselModel: IImageCarouselModelInstance
  position: TSlidePosition
}

const Slide: React.FC<ISlideProps> = observer(({ carouselModel, position }) => {
  const {
    getImageData,
    imageDataIndices,
    movementPhase,
    slideTransitionAnimation
  } = carouselModel

  verify(slideTransitionAnimation, "No 'slideTransitionAnimation' set")

  // TODO A weird TS bug
  const animatedStyle = slideTransitionAnimation.getStyle(position) as ViewStyle

  const imageDataIndex = imageDataIndices[position]

  const { aspectRatio, backgroundColor, onPress, source } =
    getImageData(imageDataIndex)

  const onImagePress = (): void => {
    onPress?.({
      imageDataIndex,
      slidePosition: position
    })
  }

  const onLoadEnd = (): void => {
    if (movementPhase === 'finalization' && position === 'current') {
      slideTransitionAnimation.move()
    }
  }

  useEffect(() => {
    if (movementPhase === 'initiation' && position === 'current') {
      slideTransitionAnimation.move()
    }
  }, [movementPhase, position, slideTransitionAnimation])

  return (
    <Animated.View style={[getContainerStyle(backgroundColor), animatedStyle]}>
      <TouchableWithoutFeedback onPress={onImagePress}>
        <Image
          onLoadEnd={onLoadEnd}
          source={source}
          style={getImageStyle(aspectRatio)}
        />
      </TouchableWithoutFeedback>
    </Animated.View>
  )
})

Slide.displayName = 'ImageCarousel/Slide'

export { Slide }
