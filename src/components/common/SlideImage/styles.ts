import type { ImageStyle } from 'expo-image'
import type { StyleProp, ViewStyle } from 'react-native'
import type { ICarouselModelInstance } from '../../../mst'

import { verify } from 'simple-common-utils'

import { getNumericSlideSize } from '../../helpers/getNumericSlideSize'

const getContainerStyle = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  backgroundColor: ViewStyle['backgroundColor'],
  carouselModel: ICarouselModelInstance
): StyleProp<ViewStyle> => {
  const { isSlideCentered, slideSize } = carouselModel

  const containerStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: backgroundColor ?? 'white'
    },
    isSlideCentered && {
      alignItems: 'center',
      justifyContent: 'center'
    }
  ]

  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (slideSize) {
    case 'carouselHeightSquare':
    case 'carouselWidthSquare': {
      const imageDimension = getNumericSlideSize(carouselModel)

      containerStyle.push({
        height: imageDimension,
        width: imageDimension
      })

      break
    }

    case 'wholeCarousel':
      containerStyle.push({ flex: 1 })
      break

    default:
      verify(
        false,
        `Support for 'slideSize' = '${slideSize}' is not implemented yet`
      )
  }

  return containerStyle
}

const getImageStyle = (aspectRatio: number): StyleProp<ImageStyle> => {
  const threshold = 1

  const dimensionName: keyof ImageStyle =
    aspectRatio > threshold ? 'width' : 'height'

  return {
    aspectRatio,
    [dimensionName]: '100%'
  }
}

export { getContainerStyle, getImageStyle }
