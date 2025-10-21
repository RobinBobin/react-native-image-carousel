import type { TTransitionDirection } from '../../mst'
import type { TSlideDataAndTransitionDirection } from './types'
import type { TPrepareParams } from './withPrepare'

type TOnFlinged = (flingDirection: TTransitionDirection) => void

type THandleFlingParams = TPrepareParams &
  TSlideDataAndTransitionDirection &
  Readonly<{
    flingDirection: TTransitionDirection
    onFlinged: TOnFlinged
  }>

type THandleFling = (params: THandleFlingParams) => void

interface IWithHandleFling {
  handleFling: THandleFling
}

export type { IWithHandleFling, THandleFling, THandleFlingParams, TOnFlinged }
