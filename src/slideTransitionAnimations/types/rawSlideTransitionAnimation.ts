interface IRawSlideTransitionAnimation {
  get duration(): number
  set duration(duration: number)
  get preTransitionDelay(): number
  set preTransitionDelay(preTransitionDelay: number)
}

type TRawSlideTransitionAnimationKey = keyof IRawSlideTransitionAnimation

type TRRawSlideTransitionAnimation = Readonly<IRawSlideTransitionAnimation>

export type {
  IRawSlideTransitionAnimation,
  TRawSlideTransitionAnimationKey,
  TRRawSlideTransitionAnimation
}
