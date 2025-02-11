import { isNumber, isObject } from 'radashi'

export const isNumericHeightAndWidth = (
  carouselDimensionsOrHeight: unknown,
  width?: unknown
): boolean => {
  return isNumber(carouselDimensionsOrHeight) ?
      isNumber(width)
    : isObject(carouselDimensionsOrHeight) &&
        'height' in carouselDimensionsOrHeight &&
        'width' in carouselDimensionsOrHeight &&
        isNumber(carouselDimensionsOrHeight.height) &&
        isNumber(carouselDimensionsOrHeight.width)
}
