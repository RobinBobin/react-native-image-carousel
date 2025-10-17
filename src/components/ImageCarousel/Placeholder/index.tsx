import type { TWithCarouselModel } from '../../../types'

import { observer } from 'mobx-react-lite'
import { View } from 'react-native'

import styles from './styles'

const Placeholder: React.FC<TWithCarouselModel> = observer(
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

Placeholder.displayName = 'Placeholder'

export { Placeholder }
