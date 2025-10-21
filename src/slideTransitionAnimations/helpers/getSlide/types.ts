import type { ReadonlyDeep } from 'type-fest'
import type { TSlideDataAndTransitionDirection } from '../../types'
import type { TAddCommonReturnType } from '../types'

export type TGetSlideParams = TSlideDataAndTransitionDirection &
  ReadonlyDeep<{ animation: TAddCommonReturnType }>
