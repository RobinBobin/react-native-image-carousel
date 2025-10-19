import type { StyleProp, ViewStyle } from 'react-native'
import type { TSlidePosition } from '../../../../../mst'

import { StyleSheet } from 'react-native'

export const getContainerStyle = (
  slidePosition: TSlidePosition
): StyleProp<ViewStyle> => [
  StyleSheet.absoluteFill,
  slidePosition !== 'current' && { zIndex: 1 }
]
