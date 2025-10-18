interface IDurationAndPreTransitionDelay {
  get duration(): number
  set duration(duration: number)
  get preTransitionDelay(): number
  set preTransitionDelay(preTransitionDelay: number)
}

type TRDurationAndPreTransitionDelay = Readonly<IDurationAndPreTransitionDelay>

export type { IDurationAndPreTransitionDelay, TRDurationAndPreTransitionDelay }
