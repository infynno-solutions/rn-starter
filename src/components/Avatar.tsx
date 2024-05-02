import * as React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {AvatarProps} from '../interfaces/componentsInterface/componentInterfaces';

const Avatar = ({source, extContainerStyles, extImageStyle}: AvatarProps) => {
  return (
    <View style={[styles.container, extContainerStyles]}>
      <Image
        style={[styles.imageSourceStyle, extImageStyle]}
        source={source}></Image>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  imageSourceStyle: {
    width: 32,
    height: 32,
  },
});
