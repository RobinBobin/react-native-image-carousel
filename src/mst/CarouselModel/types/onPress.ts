import type { TSlideId, TSlidePosition } from '../../types'

type TOnPressParams = Readonly<{
  imageDataIndex: number
  slideId: TSlideId
  slidePosition: TSlidePosition
}>

type TOnPress = (params: TOnPressParams) => void

export type { TOnPress, TOnPressParams }
