type TAnimationInterrupted = () => void

type TWithOnInterrupted = Readonly<{
  onInterrupted: TAnimationInterrupted
}>

export type { TAnimationInterrupted, TWithOnInterrupted }
