import type React from 'react'
import type { ISlideImagePropsBase } from '../../../../../common/SlideImage/types'
import type { ISlidePropsBase } from './types'

import { observer } from 'mobx-react-lite'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

import { SlideImage } from '../../../../../common/SlideImage'

type TSlideProps = Required<ISlideImagePropsBase> & ISlidePropsBase

const Slide: React.FC<TSlideProps> = observer(
  ({ carouselModel, position, slideDataSource }) => {
    const { slideData, slideTransitionAnimation } = carouselModel

    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          slideTransitionAnimation.getStyle(position)
        ]}
      >
        <SlideImage
          carouselModel={carouselModel}
          imageDataIndex={slideData[slideDataSource][position]}
          position={position}
        />
      </Animated.View>
    )
  }
)

Slide.displayName = 'Slide'

export { Slide }
