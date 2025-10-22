type TPrepare = () => void

interface IWithPrepare {
  prepare: TPrepare
}

export type { IWithPrepare, TPrepare }
