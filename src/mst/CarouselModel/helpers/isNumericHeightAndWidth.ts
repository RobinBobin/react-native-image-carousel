import { isNumber, isObject } from 'radashi'

export const isNumericHeightAndWidth = (
  carouselDimensionsOrHeight: unknown,
  width?: unknown
): boolean => {
  if (isNumber(carouselDimensionsOrHeight)) {
    return isNumber(width)
  }

  return (
    isObject(carouselDimensionsOrHeight) &&
    'height' in carouselDimensionsOrHeight &&
    'width' in carouselDimensionsOrHeight &&
    isNumber(carouselDimensionsOrHeight.height) &&
    isNumber(carouselDimensionsOrHeight.width)
  )
}
