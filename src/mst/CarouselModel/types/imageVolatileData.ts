import type { ReadonlyDeep } from 'type-fest'

type TOnHidden = () => void
type TOnShown = () => void

interface IImageCallbacks {
  onHidden?: TOnHidden
  onShown?: TOnShown
}

interface IImageVolatileData {
  callbacks?: IImageCallbacks
  overlay?: React.ReactNode
}

type TRImageVolatileData = ReadonlyDeep<IImageVolatileData>

type TImageVolatileData = Map<number, TRImageVolatileData>

export type {
  IImageCallbacks,
  IImageVolatileData,
  TImageVolatileData,
  TOnHidden,
  TOnShown,
  TRImageVolatileData
}
