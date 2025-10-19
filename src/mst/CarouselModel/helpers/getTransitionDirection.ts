import type { TTransitionDirection } from '../../types'

import { isBoolean } from 'radashi'
import { verify } from 'simple-common-utils'

export const getTransitionDirection = (
  options: unknown
): TTransitionDirection | undefined => {
  if (isBoolean(options)) {
    verify(!options, "'getTransitionDirection()': 'options' can't be 'true'")

    return undefined
  }

  switch (options) {
    case 'next':
    case 'previous':
      return options
  }

  throw new Error(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `'getTransitionDirection()': unknown 'options' value (${options})`
  )
}
