import type { ViewProps } from 'react-native'
import type { AnimatedProps } from 'react-native-reanimated'

type TAnimatedViewStyle = AnimatedProps<ViewProps>['style']
type TAxis = 'x' | 'y'

export type { TAnimatedViewStyle, TAxis }
