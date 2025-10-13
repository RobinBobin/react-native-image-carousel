import type { ComponentProps } from 'react'
import type { GestureDetector } from 'react-native-gesture-handler'

interface IPoint {
  x: number
  y: number
}

type TUseGestureReturnType = ComponentProps<typeof GestureDetector>['gesture']

export type { IPoint, TUseGestureReturnType }
