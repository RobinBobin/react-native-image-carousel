import type { TSlideDataSource } from '../mst/SlideTransitionAnimationAccessibleImageCarouselModel/types'
import type { TAnimatedViewStyle, TSlidePosition } from '../types'

import { verify } from 'simple-common-utils'

import { BaseAnimation } from './BaseAnimation'

export abstract class BaseAnimationWithDuration extends BaseAnimation {
  private _duration = 1000

  protected styles?: Readonly<
    Record<
      TSlideDataSource,
      Readonly<Record<TSlidePosition, TAnimatedViewStyle>>
    >
  >

  override getStyle(
    slideDataSource: TSlideDataSource,
    slidePosition: TSlidePosition
  ): TAnimatedViewStyle {
    verify(
      this.styles,
      `'${this.constructor.name}.getStyle(${slideDataSource}, ${slidePosition})': 'this.styles' can't be nullish`
    )

    return this.styles[slideDataSource][slidePosition]
  }

  get duration(): number {
    return this._duration
  }

  set duration(duration: number) {
    this._duration = duration
  }
}
