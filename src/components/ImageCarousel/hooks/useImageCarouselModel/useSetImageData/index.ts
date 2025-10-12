import type { TUseSetImageDataParams } from './types'

import useAsync from 'react-use/lib/useAsync'

export const useSetImageData = ({
  carouselModel,
  imageData,
  onPostSetImageData,
  onPreSetImageData
}: TUseSetImageDataParams): void => {
  useAsync(async (): Promise<void> => {
    if (imageData.length) {
      onPreSetImageData?.(carouselModel)

      await carouselModel.setImageData(imageData)

      onPostSetImageData?.(carouselModel)
    }
  }, [carouselModel, imageData, onPostSetImageData, onPreSetImageData])
}
