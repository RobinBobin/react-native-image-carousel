import type { TSlideId } from '../../../mst'
import type { TAxis, TPrepareParams } from '../../types'

export type TGetSlideOffsetParams = TPrepareParams &
  Readonly<{
    axis: TAxis
    slideId: TSlideId
  }>
