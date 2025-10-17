import type { StyleProp, ViewStyle } from 'react-native'

import { StyleSheet } from 'react-native'

export const getContainerStyle = (
  isVisible: boolean
): StyleProp<ViewStyle> => ({
  ...StyleSheet.absoluteFillObject,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  zIndex: isVisible ? 1 : undefined
})
