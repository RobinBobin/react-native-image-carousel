import type React from 'react'
import type { ISlideProps } from './types'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { verify } from 'simple-common-utils'

import { SlideImage } from '../../../../common/SlideImage'

const Slide: React.FC<ISlideProps> = observer(({ carouselModel, position }) => {
  const { imageDataIndices, movementPhase, slideTransitionAnimation } =
    carouselModel

  verify(slideTransitionAnimation, "No 'slideTransitionAnimation' set")

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
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        slideTransitionAnimation.getStyle(position)
      ]}
    >
      <SlideImage
        carouselModel={carouselModel}
        imageDataIndex={imageDataIndices[position]}
        onLoadEnd={onLoadEnd}
        position={position}
      />
    </Animated.View>
  )
})

Slide.displayName = 'ImageCarousel/Slide'

export { Slide }
