import type { ImageStyle } from 'expo-image'
import type { StyleProp, ViewStyle } from 'react-native'
import type { TAspectRatioMode } from '../../../mst/types'

import { verify } from 'simple-common-utils'

const getContainerStyle = (
  aspectRatioMode: TAspectRatioMode,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  backgroundColor: ViewStyle['backgroundColor']
): StyleProp<ViewStyle> => {
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: backgroundColor ?? 'white'
  }

  switch (aspectRatioMode) {
    case 'carouselHeight':
    case 'carouselWidth':
      verify(false, `${aspectRatioMode} is not implemented yet`)

    // eslint-disable-next-line no-fallthrough
    case 'square':
      containerStyle.alignItems = 'center'
      containerStyle.flex = 1
      containerStyle.justifyContent = 'center'

      break
  }

  return containerStyle
}

const getImageStyle = (aspectRatio: number): StyleProp<ImageStyle> => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const dimensionName: keyof ImageStyle = aspectRatio > 1 ? 'width' : 'height'

  return {
    aspectRatio,
    [dimensionName]: '100%'
  }
}

export { getContainerStyle, getImageStyle }
