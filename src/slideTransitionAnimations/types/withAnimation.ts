interface IIsAnimationInProgress {
  get isAnimationInProgress(): boolean
}

type TAnimate = () => void

interface IWithAnimation extends IIsAnimationInProgress {
  animate: TAnimate
}

export type { IIsAnimationInProgress, IWithAnimation, TAnimate }
