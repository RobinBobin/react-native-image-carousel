import type { ImageProps } from 'expo-image'
import type { StyleProp, ViewStyle } from 'react-native'
import type { SetOptional } from 'type-fest'
import type { ISlideProps } from '../../ImageCarousel/Slide/types'

export interface ISlideImageProps
  extends SetOptional<ISlideProps, 'position'>,
    Pick<ImageProps, 'onLoadEnd'> {
  containerStyle?: StyleProp<ViewStyle>
  imageDataIndex: number
}
