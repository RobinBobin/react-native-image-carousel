import type { TWithCarouselModel } from '../../../../../types'
import type { ISlidePropsBase } from './Slide/types'

import { observer } from 'mobx-react-lite'
import { View } from 'react-native'

import { SLIDE_POSITIONS } from '../../../../../constants'
import { Slide } from './Slide'
import { getContainerStyle } from './styles'

export const SlideGroup: React.FC<ISlidePropsBase & TWithCarouselModel> =
  observer(({ carouselModel, slideDataSource }) => {
    const isVisible = carouselModel.slideDataSource === slideDataSource

    return (
      <View style={getContainerStyle(isVisible)}>
        {SLIDE_POSITIONS.map(slidePosition => (
          <Slide
            carouselModel={carouselModel}
            key={slidePosition}
            position={slidePosition}
            slideDataSource={slideDataSource}
          />
        ))}
      </View>
    )
  })
