import type { TImageCarouselSetupCallback } from '../types'

export type TUseCarouselModelParams = Readonly<{
  onPostCreateModel?: TImageCarouselSetupCallback
  onPreCreateModel?: () => void
}>
