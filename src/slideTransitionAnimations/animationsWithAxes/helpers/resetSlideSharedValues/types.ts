import type { TAxis, TSlidePosition } from '../../../../types'

type TReset = (axis: TAxis, slidePosition: TSlidePosition) => void
type TResetSlideSharedValues = () => void

export type { TReset, TResetSlideSharedValues }
