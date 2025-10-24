import type { ReadonlyDeep } from 'type-fest'
import type { TSlideDataAndPosition } from '../../types'
import type { TAddCommonReturnType } from '../types'

export type TGetSlideTransitionAnimationParams = TSlideDataAndPosition &
  ReadonlyDeep<{ animation: TAddCommonReturnType }>
