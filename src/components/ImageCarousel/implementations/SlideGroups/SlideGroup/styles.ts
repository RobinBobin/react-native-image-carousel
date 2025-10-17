import type { StyleProp, ViewStyle } from 'react-native'

import { StyleSheet } from 'react-native'

export const getContainerStyle = (isVisible: boolean): StyleProp<ViewStyle> => [
  StyleSheet.absoluteFill,
  !isVisible && { opacity: 0 }
]
