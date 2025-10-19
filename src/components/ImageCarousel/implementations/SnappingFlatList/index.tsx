import type { FlatListProps, ListRenderItem } from 'react-native'
import type { TWithCarouselModel } from '../../../../mst'

import { observer } from 'mobx-react-lite'
import { range } from 'radashi'
import { useRef } from 'react'
import { FlatList, View } from 'react-native'

import { SlideImage } from '../../../common/SlideImage'
import { getNumericSlideSize } from '../../../helpers/getNumericSlideSize'

type TFlatListProps = FlatListProps<number>

const SnappingFlatList: React.FC<TWithCarouselModel> = observer(
  ({ carouselModel }) => {
    const flatList = useRef<FlatList>(null)
    const shouldSnapNext = useRef(true)

    const slideSize = getNumericSlideSize(carouselModel)

    const { imageData, imageGap } = carouselModel

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
      return (
        <SlideImage
          carouselModel={carouselModel}
          imageDataIndex={index}
          slideId='slide1'
          slidePosition='current'
        />
      )
    }

    return (
      <FlatList
        horizontal
        ItemSeparatorComponent={ItemSeparatorComponent}
        data={data}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ref={flatList}
        renderItem={renderItem}
      />
    )
  }
)

SnappingFlatList.displayName = 'SnappingFlatList'

export { SnappingFlatList }
