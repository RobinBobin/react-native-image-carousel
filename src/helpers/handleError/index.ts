import type { IHandler, THandleError } from './types'

const handler: IHandler = {
  handle(error) {
    alert((error as Error).message)
  }
}

const handleError: THandleError = error => handler.handle(error)

const setHandleError = (newHandleError: THandleError): void => {
  handler.handle = newHandleError
}

export { handleError, setHandleError }
