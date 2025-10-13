import type { ImageProps } from 'expo-image'
import type { SetOptional, UndefinedOnPartialDeep } from 'type-fest'
import type { TWithCarouselModel } from '../../../types'
import type { ISlideProps } from '../../ImageCarousel/implementations/Slides/Slide/types'

import { Image } from 'expo-image'
import { observer } from 'mobx-react-lite'
import { Pressable } from 'react-native-gesture-handler'

import { getContainerStyle, getImageStyle } from './styles'

type TImageProps = UndefinedOnPartialDeep<Pick<ImageProps, 'onLoadEnd'>>

type TSlideImagePropsBase = SetOptional<ISlideProps, 'position'> &
  TImageProps &
  TWithCarouselModel

interface ISlideImageProps extends TSlideImagePropsBase {
  imageDataIndex: number
}

const SlideImage: React.FC<ISlideImageProps> = observer(
  ({ carouselModel, imageDataIndex, onLoadEnd, position }) => {
    const { getImageDatum } = carouselModel

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
        style={getContainerStyle(backgroundColor, carouselModel)}
      >
        <Image {...imageProps} />
      </Pressable>
    )
  }
)

SlideImage.displayName = 'ImageCarousel/SlideImage'

export { SlideImage }
