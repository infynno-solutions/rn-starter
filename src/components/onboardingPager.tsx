import React, {useRef} from 'react';
import {Animated, Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {OnBoardingPageProps} from '../interfaces/componentsInterface/componentInterfaces';
import {useSelector} from 'react-redux';
import {RootState} from '../../App';

const {width} = Dimensions.get('window');
const data = ['brown', 'orange', 'red', 'blue', 'green'];

export default function OnBaordingPager({
  data,
  indicatorAnimationType,
}: OnBoardingPageProps) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const scrollValue = useRef(new Animated.Value(0)).current;
  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 20],
  });
  const inputRange = [0];
  const scaleOutputRange = [1];

  data.forEach(
    (_, i) =>
      i != 0 && inputRange.push(...[(width * (2 * i - 1)) / 2, width * i]),
  );
  data.forEach(
    (_, i) =>
      i != 0 &&
      scaleOutputRange.push(
        ...[indicatorAnimationType === 'STRETCH' ? 3 : 0, 1],
      ),
  );

  const scaleX = scrollValue.interpolate({
    inputRange,
    outputRange: scaleOutputRange,
  });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollValue}}}],
          {useNativeDriver: false},
        )}>
        {data.map(x => (
          <View style={[styles.card, {backgroundColor: x}]} key={x}></View>
        ))}
      </ScrollView>
      <View style={styles.indicatorConatiner} pointerEvents="none">
        {data.map((i: any, x: number) => (
          <Indicator x={x} key={x} />
        ))}
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              position: 'absolute',
              transform: [
                {translateX},
                {scaleX: indicatorAnimationType !== 'NORMAL' ? scaleX : 1},
              ],
            },
          ]}
        />
      </View>
    </View>
  );
}

function Indicator({x}: {x: number}) {
  return <View style={styles.indicator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 3,
  },
  card: {
    width: width - 20,
    height: '100%',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  indicatorConatiner: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#00000044',
    marginHorizontal: 5,
  },
  activeIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
});
