import type { FlatListProps, ListRenderItem } from 'react-native'
import type { TWithCarouselModel } from '../../../../types'

import { observer } from 'mobx-react-lite'
import { range } from 'radashi'
import { useRef } from 'react'
import { FlatList, View } from 'react-native'

import { getNumericSlideSize } from '../../../../helpers/mst/getNumericSlideSize'
import { SlideImage } from '../../../common/SlideImage'

type TFlatListProps = FlatListProps<number>

const SnappingFlatList: React.FC<TWithCarouselModel> = observer(
  ({ carouselModel }) => {
    const flatList = useRef<FlatList>(null)
    const shouldSnapNext = useRef(true)

    const slideSize = getNumericSlideSize(carouselModel)

    const { imageData, imageGap, isHorizontal } = carouselModel

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const data = Array.from(range(imageData.length - 1))

    const ItemSeparatorComponent: React.FC = () => {
      return <View style={{ width: imageGap }} />
    }

    const getItemLayout: TFlatListProps['getItemLayout'] = (_data, index) => ({
      index,
      length: slideSize,
      offset: index * (imageGap + slideSize)
    })

    const onMomentumScrollEnd: TFlatListProps['onMomentumScrollEnd'] = ({
      nativeEvent: { contentOffset }
    }) => {
      if (!shouldSnapNext.current) {
        shouldSnapNext.current = true

        return
      }

      shouldSnapNext.current = false

      const index = Math.round(contentOffset.x / (slideSize + imageGap))

      flatList.current?.scrollToIndex({ animated: true, index })
    }

    const renderItem: ListRenderItem<number> = ({ index }) => {
      return <SlideImage carouselModel={carouselModel} imageDataIndex={index} />
    }

    return (
      <FlatList
        ItemSeparatorComponent={ItemSeparatorComponent}
        data={data}
        getItemLayout={getItemLayout}
        horizontal={isHorizontal}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ref={flatList}
        renderItem={renderItem}
      />
    )
  }
)

SnappingFlatList.displayName = 'ImageCarousel/SnappingFlatList'

export { SnappingFlatList }
