import type { Entry } from 'type-fest'
import type { TSlideData } from '../../mst'
import type { TSlideDataAndTransitionDirection } from '../types'

import { verify } from 'simple-common-utils'

export const getSlideDatum = ({
  slideData,
  transitionDirection
}: TSlideDataAndTransitionDirection): Entry<TSlideData> => {
  const slideDatum = Object.entries(slideData).find(([, [slidePosition]]) => {
    return slidePosition === transitionDirection
  })

  verify(
    slideDatum,
    `'getSlideDatumByTransitionDirection(${JSON.stringify(slideData)}, ${transitionDirection})': slideDatum can't be nullish`
  )

  return slideDatum as Entry<TSlideData>
}
