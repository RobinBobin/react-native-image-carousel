import type { ImageProps } from 'expo-image'
import type { ISlideImageProps } from './types'

import { Image } from 'expo-image'
import { observer } from 'mobx-react-lite'
import { Pressable } from 'react-native-gesture-handler'

import { getContainerStyle, getImageStyle } from './styles'

const SlideImage: React.FC<ISlideImageProps> = observer(
  ({ carouselModel, containerStyle, imageDataIndex, onLoadEnd, position }) => {
    const { aspectRatioMode, getImageDatum } = carouselModel

    const { aspectRatio, backgroundColor, onPress, source } =
      getImageDatum(imageDataIndex)

    const onImagePress = (): void => {
      onPress?.({
        imageDataIndex,
        slidePosition: position
      })
    }

    const imageProps: ImageProps = {
      ...(onLoadEnd && { onLoadEnd }),
      source,
      style: getImageStyle(aspectRatio)
    }

    return (
      <Pressable
        onPress={onImagePress}
        style={[
          containerStyle,
          getContainerStyle(aspectRatioMode, backgroundColor)
        ]}
      >
        <Image {...imageProps} />
      </Pressable>
    )
  }
)

SlideImage.displayName = 'ImageCarousel/SlideImage'

export { SlideImage }
