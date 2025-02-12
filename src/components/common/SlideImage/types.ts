import type { ImageProps } from 'expo-image'
import type { SetOptional } from 'type-fest'
import type { ISlideProps } from '../../ImageCarousel/implementations/Slides/Slide/types'

export interface ISlideImageProps
  extends SetOptional<ISlideProps, 'position'>,
    Pick<ImageProps, 'onLoadEnd'> {
  imageDataIndex: number
}
