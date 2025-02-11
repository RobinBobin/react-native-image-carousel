import type { IComponentWithCarouselModelProps } from '../../common/types'

import { observer } from 'mobx-react-lite'
import { View } from 'react-native'

import styles from './styles'

const Placeholder: React.FC<IComponentWithCarouselModelProps> = observer(
  ({ carouselModel }) => {
    const {
      aspectRatio,
      carouselDimensions,
      placeholder,
      placeholderContainerStyle
    } = carouselModel

    return (
      <View
        style={[
          styles.container,
          placeholderContainerStyle,
          { ...carouselDimensions, aspectRatio }
        ]}
      >
        {placeholder}
      </View>
    )
  }
)

Placeholder.displayName = 'ImageCarousel/Placeholder'

export { Placeholder }
