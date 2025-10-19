type TSlideId = 'slide1' | 'slide2' | 'slide3'

type TTransitionDirection = 'next' | 'previous'
type TSlidePosition = 'current' | TTransitionDirection

type TSlideDatum = Readonly<[TSlidePosition, number]>
type TSlideData = Readonly<Record<TSlideId, TSlideDatum>>

export type {
  TSlideData,
  TSlideDatum,
  TSlideId,
  TSlidePosition,
  TTransitionDirection
}
