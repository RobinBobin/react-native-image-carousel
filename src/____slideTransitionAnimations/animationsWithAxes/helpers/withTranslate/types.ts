import type { TGetSharedValue } from '../getSharedValue'
import type { TResetSlideSharedValues } from '../resetSlideSharedValues'
import type { TUseAxisSharedValues } from '../types'

export interface IWithTranslateReturnType {
  getTranslate: TGetSharedValue
  resetTranslate: TResetSlideSharedValues
  useTranslate: TUseAxisSharedValues
}
