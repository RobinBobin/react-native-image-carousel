import type { ViewProps } from 'react-native'
import type { IComponentWithCarouselModelProps } from '../common/types'

import { observer } from 'mobx-react-lite'
import { pick } from 'radashi'
import React, { useMemo } from 'react'
import { View } from 'react-native'

import { useSlideTransitionAnimation } from './hooks/useSlideTransitionAnimation'
import { Slides, SnappingFlatList } from './implementations'
import { Placeholder } from './Placeholder'
import { getContainerStyle } from './styles'

const ImageCarousel: React.FC<IComponentWithCarouselModelProps> = observer(
  ({ carouselModel }) => {
    useSlideTransitionAnimation(carouselModel)

    const {
      aspectRatio,
      carouselDimensions,
      isLoading,
      isSnapEnabled,
      setCarouselDimensions
    } = carouselModel

    const Implementation = useMemo(() => {
      return isSnapEnabled ? SnappingFlatList : Slides
    }, [isSnapEnabled])

    const onLayout: ViewProps['onLayout'] = ({ nativeEvent: { layout } }) =>
      setCarouselDimensions(pick(layout, ['width', 'height']))

    return isLoading ?
        <Placeholder carouselModel={carouselModel} />
      : <View
          onLayout={onLayout}
          style={getContainerStyle(aspectRatio, carouselDimensions)}
        >
          <Implementation carouselModel={carouselModel} />
        </View>
  }
)

ImageCarousel.displayName = 'ImageCarousel'

export { ImageCarousel }
