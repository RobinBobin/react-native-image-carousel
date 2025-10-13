import type React from 'react'
import type { ISlideProps } from './types'

import { observer } from 'mobx-react-lite'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

import { SlideImage } from '../../../../common/SlideImage'

const Slide: React.FC<ISlideProps> = observer(({ carouselModel, position }) => {
  const { imageDataIndices, slideTransitionAnimation, transitionPhase } =
    carouselModel

  const onLoadEnd =
    position !== 'current' ? undefined : (
      (): void => {
        // `ImageCarouselModel.watchTransitionPhase()` can't be used due to image flickering.
        if (transitionPhase === 'finalization') {
          slideTransitionAnimation.move()
        }
      }
    )

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
