import type { ISlideTransitionAnimationAccessibleImageCarouselModelInstance } from '../mst/SlideTransitionAnimationAccessibleImageCarouselModel'
import type { TAnimatedViewStyle, TSlidePosition } from '../types'

export abstract class BaseAnimation {
  private _isAutoTransitionEnabled = false
  private _preTransitionDelay = 1000

  constructor(
    protected readonly carouselModel: ISlideTransitionAnimationAccessibleImageCarouselModelInstance
  ) {}

  abstract getStyle(slidePosition: TSlidePosition): TAnimatedViewStyle
  abstract move(): void
  abstract useStyles(): void

  get isAutoTransitionEnabled(): boolean {
    return this._isAutoTransitionEnabled
  }

  set isAutoTransitionEnabled(isAutoTransitionEnabled: boolean) {
    this._isAutoTransitionEnabled = isAutoTransitionEnabled
  }

  get preTransitionDelay(): number {
    return this._preTransitionDelay
  }

  set preTransitionDelay(preTransitionDelay: number) {
    this._preTransitionDelay = preTransitionDelay
  }
}
