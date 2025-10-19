import type { TSlideId } from '../../../mst'
import type { TAxis, TResetParams } from '../../types'

export type TGetSlideOffsetParams = TResetParams &
  Readonly<{
    axis: TAxis
    slideId: TSlideId
  }>
