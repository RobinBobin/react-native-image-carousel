import type { ImageStyle, StyleProp, ViewStyle } from 'react-native'

import { StyleSheet } from 'react-native'

const getContainerStyle = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  backgroundColor: ViewStyle['backgroundColor']
): StyleProp<ViewStyle> => {
  return {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: backgroundColor ?? 'white',
    justifyContent: 'center'
  }
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
