import type { TRCarouselDimensions, TSlideData } from '../../mst'

type TPrepareParams = Readonly<{
  carouselDimensions: TRCarouselDimensions
  slideData: TSlideData
}>
type TPrepare = (params: TPrepareParams) => void

interface IWithPrepare {
  prepare: TPrepare
}

export type { IWithPrepare, TPrepare, TPrepareParams }
