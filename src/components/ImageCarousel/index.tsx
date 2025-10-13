import type { ViewProps } from 'react-native'
import type { TWithCarouselModel } from '../../types'

import { observer } from 'mobx-react-lite'
import { pick } from 'radashi'
import React from 'react'
import { View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'

import { useGesture } from './hooks/useGesture'
import { Slides, SnappingFlatList } from './implementations'
import { Placeholder } from './Placeholder'
import { getContainerStyle } from './styles'

const ImageCarousel: React.FC<TWithCarouselModel> = observer(
  ({ carouselModel }) => {
    const {
      aspectRatio,
      carouselDimensions,
      isLoading,
      isSnapEnabled,
      setCarouselDimensions,
      slideTransitionAnimation,
      style
    } = carouselModel

    slideTransitionAnimation.useStyles()

    const gesture = useGesture(carouselModel)

    if (isLoading) {
      return <Placeholder carouselModel={carouselModel} />
    }

    const onLayout: ViewProps['onLayout'] = ({ nativeEvent: { layout } }) =>
      setCarouselDimensions(pick(layout, ['width', 'height']))

    const Implementation = isSnapEnabled ? SnappingFlatList : Slides

    return (
      <GestureDetector gesture={gesture}>
        <View
          onLayout={onLayout}
          style={getContainerStyle(aspectRatio, carouselDimensions, style)}
        >
          <Implementation carouselModel={carouselModel} />
        </View>
      </GestureDetector>
    )
  }
)

ImageCarousel.displayName = 'ImageCarousel'

export { ImageCarousel }
