interface IWithDurationAndPreTransitionDelay {
  get duration(): number
  set duration(duration: number)
  get preTransitionDelay(): number
  set preTransitionDelay(preTransitionDelay: number)
}

type TRWithDurationAndPreTransitionDelay =
  Readonly<IWithDurationAndPreTransitionDelay>

export type {
  IWithDurationAndPreTransitionDelay,
  TRWithDurationAndPreTransitionDelay
}
