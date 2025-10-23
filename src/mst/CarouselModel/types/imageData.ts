import type { ViewStyle } from 'react-native'
import type { TOnPress } from './onPress'

type TOnHidden = () => void
type TOnShown = () => void

interface ICommonImageData extends Pick<ViewStyle, 'backgroundColor'> {
  onHidden?: TOnHidden
  onPress?: TOnPress
  onShown?: TOnShown
  overlay?: React.ReactNode
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
  TOnHidden,
  TOnShown,
  TRawImageData,
  TRawImageDatum
}
