import type { StyleProp } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { ReadonlyDeep } from 'type-fest'
import type { ISwitchAnimationAccessibleImageCarouselModelInstance } from '../mst/SwitchAnimationAccessibleImageCarouselModel'
import type { TSlidePosition } from '../types'

export abstract class BaseAnimation {
  private _isAutoSwitchEnabled = false
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  private _preSwitchDelay = 1000

  constructor(
    protected readonly carouselModel: ReadonlyDeep<ISwitchAnimationAccessibleImageCarouselModelInstance>
  ) {}

  abstract getStyle(slidePosition: TSlidePosition): StyleProp<AnimatedStyle>
  abstract switch(): void
  abstract useStyles(): void

  get isAutoSwitchEnabled(): boolean {
    return this._isAutoSwitchEnabled
  }

  set isAutoSwitchEnabled(isAutoSwitchEnabled: boolean) {
    this._isAutoSwitchEnabled = isAutoSwitchEnabled
  }

  get preSwitchDelay(): number {
    return this._preSwitchDelay
  }

  set preSwitchDelay(preSwitchDelay: number) {
    this._preSwitchDelay = preSwitchDelay
  }
}
