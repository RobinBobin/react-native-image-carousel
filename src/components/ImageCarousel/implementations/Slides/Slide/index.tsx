import type React from 'react'
import type { TSlideId } from '../../../../../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'
import type { TWithCarouselModel } from '../../../../../types'

import { observer } from 'mobx-react-lite'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import useUpdateEffect from 'react-use/lib/useUpdateEffect'

import { SlideImage } from '../../../../common/SlideImage'

interface ISlideProps extends TWithCarouselModel {
  slideId: TSlideId
}

const Slide: React.FC<ISlideProps> = observer(({ carouselModel, slideId }) => {
  const { isRedrawForced, slideData, slidesTransitionAnimation } = carouselModel

  useUpdateEffect(() => {
    console.log('redraw forced')
  }, [isRedrawForced])

  const slideDatum = slideData[slideId]
  const position = slideDatum[0]

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const zIndex = position === 'current' ? undefined : 1

  console.log(slideId, slideDatum, zIndex)

  return (
    <Animated.View
      style={[
        slidesTransitionAnimation[slideId].useStyle(),
        {
          ...StyleSheet.absoluteFillObject,
          zIndex
        }
      ]}
    >
      <SlideImage
        carouselModel={carouselModel}
        imageDataIndex={slideData[slideId][1]}
        position={position}
        slideId={slideId}
      />
    </Animated.View>
  )
})

Slide.displayName = 'Slide'

export { Slide }
