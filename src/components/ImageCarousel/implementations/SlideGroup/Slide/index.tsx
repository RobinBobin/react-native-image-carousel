import type React from 'react'
import type { TSlideId, TWithCarouselModel } from '../../../../../mst'

import { observer } from 'mobx-react-lite'
import Animated from 'react-native-reanimated'

import { SlideImage } from '../../../../common/SlideImage'
import { getContainerStyle } from './styles'

interface ISlideProps extends TWithCarouselModel {
  slideId: TSlideId
}

const Slide: React.FC<ISlideProps> = observer(({ carouselModel, slideId }) => {
  const { slideData, slideGroupTransitionAnimation } = carouselModel
  const [slidePosition, imageDataIndex] = slideData[slideId]

  return (
    <Animated.View
      style={[
        slideGroupTransitionAnimation[slideId].useStyle(),
        getContainerStyle(slidePosition)
      ]}
    >
      <SlideImage
        carouselModel={carouselModel}
        imageDataIndex={imageDataIndex}
        slideId={slideId}
        slidePosition={slidePosition}
      />
    </Animated.View>
  )
})

Slide.displayName = 'Slide'

export { Slide }
