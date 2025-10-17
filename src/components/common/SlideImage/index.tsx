import type { ISlideImagePropsBase } from './types'

import { Image } from 'expo-image'
import { observer } from 'mobx-react-lite'
import { Pressable } from 'react-native-gesture-handler'

import { getContainerStyle, getImageStyle } from './styles'

interface ISlideImageProps extends ISlideImagePropsBase {
  imageDataIndex: number
}

const SlideImage: React.FC<ISlideImageProps> = observer(
  ({ carouselModel, imageDataIndex, position }) => {
    const { aspectRatio, backgroundColor, onPress, source } =
      carouselModel.getImageDatum(imageDataIndex)

    const onImagePress = (): void => {
      onPress?.({
        imageDataIndex,
        slidePosition: position
      })
    }

    return (
      <Pressable
        onPress={onImagePress}
        style={getContainerStyle(backgroundColor, carouselModel)}
      >
        <Image source={source} style={getImageStyle(aspectRatio)} />
      </Pressable>
    )
  }
)

SlideImage.displayName = 'SlideImage'

export { SlideImage }
