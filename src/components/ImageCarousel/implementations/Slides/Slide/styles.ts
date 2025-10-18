import type { StyleProp, ViewStyle } from 'react-native'

import { StyleSheet } from 'react-native'

export const getContainerStyle = (zIndex?: number): StyleProp<ViewStyle> => [
  StyleSheet.absoluteFill,
  { zIndex }
]
