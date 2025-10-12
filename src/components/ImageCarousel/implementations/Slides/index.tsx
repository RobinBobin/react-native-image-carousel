import type { TWithCarouselModel } from '../../../../types'

import { Slide } from './Slide'

const Slides: React.FC<TWithCarouselModel> = ({ carouselModel }) => {
  return (
    <>
      <Slide carouselModel={carouselModel} position='current' />
      <Slide carouselModel={carouselModel} position='previous' />
      <Slide carouselModel={carouselModel} position='next' />
    </>
  )
}

Slides.displayName = 'ImageCarousel/Slides'

export { Slides }
