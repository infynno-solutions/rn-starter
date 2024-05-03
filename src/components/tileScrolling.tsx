import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {TileScrollingProps} from '../interfaces/componentsInterface/componentInterfaces';

const {width} = Dimensions.get('window');
const itemWidth = (width / 3) * 2;
const gap = (width - itemWidth) / 4;

export default function TileScrolling({data}: TileScrollingProps) {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      decelerationRate="fast"
      contentContainerStyle={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      snapToInterval={itemWidth + gap}>
      {data.map(x => (
        <View key={x} style={styles.item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: gap * 2,
    paddingRight: gap,
    alignItems: 'center',
  },
  item: {
    height: itemWidth,
    width: itemWidth,
    backgroundColor: 'darkred',
    marginRight: gap,
    borderRadius: 10,
  },
});
