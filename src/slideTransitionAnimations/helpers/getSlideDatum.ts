import type { Entry } from 'type-fest'
import type { TSlideData } from '../../mst'
import type { TSlideDataAndPosition } from '../types'

import { verify } from 'simple-common-utils'

export const getSlideDatum = ({
  slideData,
  slidePosition
}: TSlideDataAndPosition): Entry<TSlideData> => {
  const slideDatum = Object.entries(slideData).find(([, datum]) => {
    return datum[0] === slidePosition
  })

  verify(
    slideDatum,
    `'getSlideDatumByTransitionDirection(${JSON.stringify(slideData)}, ${slidePosition})': slideDatum can't be nullish`
  )

  return slideDatum as Entry<TSlideData>
}
