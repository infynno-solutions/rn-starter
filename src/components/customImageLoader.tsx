import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {CustomImageLoaderProps} from '../interfaces/componentsInterface/componentInterfaces';
import Icons from './vectorIconSet';
import colors from '../constants/color';
import {useSelector} from 'react-redux';
import {RootState} from '../../App';

const CustomImageLoader = ({isLoading, children}: CustomImageLoaderProps) => {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleAnimation = () => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        easing: Easing.linear,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  };

  const stopAnimation = () => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        easing: Easing.linear,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).stop();
  };

  useEffect(() => {
    if (isLoading) {
      handleAnimation();
    } else {
      stopAnimation();
    }
  }, [isLoading]);

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-720deg'],
  });
  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        {children || (
          <Icons.FontAwesome6 name="spinner" size={30} color={theme.text} />
        )}
      </Animated.View>
    </View>
  );
};

export default CustomImageLoader;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
