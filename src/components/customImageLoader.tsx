import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {CustomImageLoaderProps} from '../interfaces/componentsInterface/componentInterfaces';

const CustomImageLoader = ({isLoading, children}: CustomImageLoaderProps) => {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

  const handleAnimation = () => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        easing: Easing.linear,
        duration: 3000,
        useNativeDriver: true,
      }),
    ).start();
  };

  const stopAnimation = () => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        easing: Easing.linear,
        duration: 3000,
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
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </View>
  );
};

export default CustomImageLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
