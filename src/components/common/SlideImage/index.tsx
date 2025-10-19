import type { TSlideId, TSlidePosition, TWithCarouselModel } from '../../../mst'

import { Image } from 'expo-image'
import { observer } from 'mobx-react-lite'
import { Pressable } from 'react-native-gesture-handler'

import { getContainerStyle, getImageStyle } from './styles'

interface ISlideImageProps extends TWithCarouselModel {
  imageDataIndex: number
  slidePosition: TSlidePosition
  slideId: TSlideId
}

const SlideImage: React.FC<ISlideImageProps> = observer(
  ({ carouselModel, imageDataIndex, slideId, slidePosition }) => {
    const { aspectRatio, backgroundColor, onPress, overlay, source } =
      carouselModel.getImageDatum(imageDataIndex)

    const onImagePress = (): void => {
      onPress?.({
        imageDataIndex,
        slideId,
        slidePosition
      })
    }

    return (
      <Pressable
        onPress={onImagePress}
        style={getContainerStyle(backgroundColor, carouselModel)}
      >
        <Image source={source} style={getImageStyle(aspectRatio)} />
        {overlay}
      </Pressable>
    )
  }
)

SlideImage.displayName = 'SlideImage'

export { SlideImage }
