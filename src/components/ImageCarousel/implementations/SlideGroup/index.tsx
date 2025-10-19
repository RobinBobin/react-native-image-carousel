import type { TWithCarouselModel } from '../../../../mst'

import { observer } from 'mobx-react-lite'

import { SLIDE_IDS } from '../../../../mst'
import { Slide } from './Slide'

export const SlideGroup: React.FC<TWithCarouselModel> = observer(
  ({ carouselModel }) => {
    return SLIDE_IDS.map(slideId => (
      <Slide carouselModel={carouselModel} key={slideId} slideId={slideId} />
    ))
  }
)
