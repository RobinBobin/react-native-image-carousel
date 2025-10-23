type TAnimate = () => void
type TCancelCurrentAnimation = () => void

interface IAnimationMethods {
  animate: TAnimate
  cancelCurrentAnimation: TCancelCurrentAnimation
}

interface IIsAnimationInProgress {
  get isAnimationInProgress(): boolean
}

type TWithAnimation = IAnimationMethods & IIsAnimationInProgress

export type {
  IAnimationMethods,
  IIsAnimationInProgress,
  TAnimate,
  TCancelCurrentAnimation,
  TWithAnimation
}
