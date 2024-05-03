import React, {useRef} from 'react';
import {Animated, Dimensions, ScrollView, StyleSheet} from 'react-native';
import {TileScrollingProps} from '../interfaces/componentsInterface/componentInterfaces';

const {width} = Dimensions.get('window');
const itemWidth = (width / 3) * 2;
const padding = (width - itemWidth) / 2;
const offset = itemWidth;
export default function AnimatedTileScrolling({data}: TileScrollingProps) {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <ScrollView
      horizontal
      pagingEnabled
      decelerationRate="fast"
      contentContainerStyle={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      snapToInterval={offset}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: false,
      })}>
      {data.map((x, i) => (
        <Item key={x} i={i} scrollX={scrollX} />
      ))}
    </ScrollView>
  );
}

function Item({i, scrollX}: {i: number; scrollX: any}) {
  const scale = scrollX.interpolate({
    inputRange: [-offset + i * offset, i * offset, offset + i * offset],
    outputRange: [0.75, 1, 0.75],
  });
  return <Animated.View style={[styles.item, {transform: [{scale}]}]} />;
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: padding,
    alignItems: 'center',
  },
  item: {
    height: itemWidth,
    width: itemWidth,
    backgroundColor: 'darkblue',
    borderRadius: 10,
  },
});
