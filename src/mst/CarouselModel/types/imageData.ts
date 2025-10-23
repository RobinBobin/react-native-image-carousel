import type { ViewStyle } from 'react-native'
import type { TOnPress } from './onPress'

interface ICommonImageData extends Pick<ViewStyle, 'backgroundColor'> {
  onPress?: TOnPress
}

interface IImageData {
  aspectRatio: number
  source: { uri: string }
}

interface IRawImageData {
  source: number | string
}

type TImageDatum = ICommonImageData & IImageData
type TRawImageDatum = ICommonImageData & IRawImageData

type TImageData = TImageDatum[]
type TRawImageData = TRawImageDatum[]

export type {
  ICommonImageData,
  IImageData,
  IRawImageData,
  TImageData,
  TImageDatum,
  TRawImageData,
  TRawImageDatum
}
