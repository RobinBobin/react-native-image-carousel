import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAxes, TAxis } from '../../types'

import { castArray } from 'radashi'

import { BaseAnimationWithDuration } from '../BaseAnimationWithDuration'

export abstract class BaseAnimationWithAxes extends BaseAnimationWithDuration {
  protected readonly axes: TAxes

  constructor(
    axes: TAxis | TAxes,
    carouselModel: ISlideTransitionAnimationAccessibleImageCarouselModelInstance
  ) {
    super(carouselModel)

    this.axes = castArray(axes)
  }
}
