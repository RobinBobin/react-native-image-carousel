import type { ViewProps } from 'react-native'
import type { TWithCarouselModel } from '../../mst'

import { observer } from 'mobx-react-lite'
import { pick } from 'radashi'
import React from 'react'
import { View } from 'react-native'

import { SlideGroup, SnappingFlatList } from './implementations'
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
      style
    } = carouselModel

    // const gesture = useGesture(carouselModel.slideTransitionAnimation)

    if (isLoading) {
      return <Placeholder carouselModel={carouselModel} />
    }

    const onLayout: ViewProps['onLayout'] = ({ nativeEvent: { layout } }) =>
      setCarouselDimensions(pick(layout, ['width', 'height']))

    const Implementation = isSnapEnabled ? SnappingFlatList : SlideGroup

    return (
      <>
        <View
          onLayout={onLayout}
          style={getContainerStyle(aspectRatio, carouselDimensions, style)}
        >
          <Implementation carouselModel={carouselModel} />
        </View>
      </>
    )
  }
)

ImageCarousel.displayName = 'ImageCarousel'

export { ImageCarousel }
