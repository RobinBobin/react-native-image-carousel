import type React from 'react'
import type { IImageCarouselModelInstance } from '../../mst'
import type { TSlidePosition } from '../../types'

import { Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { verify } from 'simple-common-utils'

import { onImagePress } from './helpers/onImagePress'
import styles from './styles'

interface ISlideProps {
  carouselModel: IImageCarouselModelInstance
  position: TSlidePosition
}

export const Slide: React.FC<ISlideProps> = ({ carouselModel, position }) => {
  const { getImageData, getImageIndex, switchAnimation } = carouselModel

  verify(switchAnimation, `Slide: no 'switchAnimation' for '${position}'`)

  const animatedStyle = switchAnimation.getStyle(position)

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableWithoutFeedback
        onPress={onImagePress(getImageData, getImageIndex, position)}
      >
        <Image
          source={carouselModel.getImageData(position).source}
          style={styles.image}
        />
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}
