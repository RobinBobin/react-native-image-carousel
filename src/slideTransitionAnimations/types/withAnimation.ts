type TAnimate = () => void
type TCancelInProgressAnimation = () => void

interface IAnimationMethods {
  animate: TAnimate
  cancelInProgressAnimation: TCancelInProgressAnimation
}

interface IIsAnimationInProgress {
  get isAnimationInProgress(): boolean
}

type TWithAnimation = IAnimationMethods & IIsAnimationInProgress

export type {
  IAnimationMethods,
  IIsAnimationInProgress,
  TAnimate,
  TCancelInProgressAnimation,
  TWithAnimation
}
