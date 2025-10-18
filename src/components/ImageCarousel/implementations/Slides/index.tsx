import type { TWithCarouselModel } from '../../../../types'

import { observer } from 'mobx-react-lite'

import { SLIDE_IDS } from '../../../../constants'
import { Slide } from './Slide'

export const Slides: React.FC<TWithCarouselModel> = observer(
  ({ carouselModel }) => {
    return SLIDE_IDS.map(slideId => (
      <Slide carouselModel={carouselModel} key={slideId} slideId={slideId} />
    ))
  }
)
