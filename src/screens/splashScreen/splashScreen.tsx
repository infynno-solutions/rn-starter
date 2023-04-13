import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './splashScreen.styles';

type Props = {};

const SplashScreen = (props: Props) => {
  return (
    <View style={styles.container2}>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
