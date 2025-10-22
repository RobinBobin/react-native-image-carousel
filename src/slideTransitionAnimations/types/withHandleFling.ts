import type { TTransitionDirection } from '../../mst'

type THandleFlingParams = Readonly<{
  flingDirection: TTransitionDirection
}>

type THandleFling = (params: THandleFlingParams) => void

interface IWithHandleFling {
  handleFling: THandleFling
}

export type { IWithHandleFling, THandleFling, THandleFlingParams }
