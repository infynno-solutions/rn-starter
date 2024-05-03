import * as React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {AvatarProps} from '../interfaces/componentsInterface/componentInterfaces';
import colors from '../constants/color';

const Avatar = ({
  source,
  extContainerStyles,
  extImageStyle,
  onPress,
}: AvatarProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={[styles.container, extContainerStyles]}>
      <Image
        resizeMode="contain"
        style={[styles.imageSourceStyle, extImageStyle]}
        source={source}></Image>
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageSourceStyle: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});
