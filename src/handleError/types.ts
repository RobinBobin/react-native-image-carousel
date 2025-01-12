type THandleError = (error: unknown) => void

interface IHandler {
  handle: THandleError
}

export type { IHandler, THandleError }
