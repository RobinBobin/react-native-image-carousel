import type { TAnimatedViewStyle, TSlidePosition } from '../types'

import { verify } from 'simple-common-utils'

import { BaseAnimation } from './BaseAnimation'

export abstract class BaseAnimationWithDuration extends BaseAnimation {
  private _duration = 1000

  protected styles?: Readonly<Record<TSlidePosition, TAnimatedViewStyle>>

  override getStyle(slidePosition: TSlidePosition): TAnimatedViewStyle {
    verify(
      this.styles,
      `'${this.constructor.name}.getStyle(${slidePosition})': 'this.styles' can't be nullish`
    )

    return this.styles[slidePosition]
  }

  get duration(): number {
    return this._duration
  }

  set duration(duration: number) {
    this._duration = duration
  }
}
