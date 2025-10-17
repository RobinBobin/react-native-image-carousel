import type { TWithCarouselModel } from '../../../../types'

import { SLIDE_DATA_SOURCES } from '../../../../constants'
import { SlideGroup } from './SlideGroup'

const SlideGroups: React.FC<TWithCarouselModel> = ({ carouselModel }) => {
  return SLIDE_DATA_SOURCES.map(slideDataSource => (
    <SlideGroup
      carouselModel={carouselModel}
      key={slideDataSource}
      slideDataSource={slideDataSource}
    />
  ))
}

SlideGroups.displayName = 'SlideGroups'

export { SlideGroups }
