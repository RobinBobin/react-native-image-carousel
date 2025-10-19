import type { TRCarouselDimensions, TSlideData } from '../../mst'

type TResetParams = Readonly<{
  carouselDimensions: TRCarouselDimensions
  slideData: TSlideData
}>
type TReset = (params: TResetParams) => void

interface IResettable {
  reset: TReset
}

export type { IResettable, TReset, TResetParams }
