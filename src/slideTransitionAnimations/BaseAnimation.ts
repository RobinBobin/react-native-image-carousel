import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAnimatedViewStyle, TSlidePosition } from '../types'

export abstract class BaseAnimation {
  private _preTransitionDelay = 0

  constructor(
    protected readonly carouselModel: ISlideTransitionAnimationAccessibleImageCarouselModelInstance
  ) {}

  abstract cancelTransition(): void
  abstract getStyle(slidePosition: TSlidePosition): TAnimatedViewStyle
  abstract move(): void
  abstract useStyles(): void

  get preTransitionDelay(): number {
    return this._preTransitionDelay
  }

  set preTransitionDelay(preTransitionDelay: number) {
    this._preTransitionDelay = preTransitionDelay
  }

  protected get preTransitionDelayToUse(): number {
    const noDelay = 0

    return this.carouselModel.shouldUsePreTransitionDelay ?
        this.preTransitionDelay
      : noDelay
  }
}
