import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/color';
import {IconButtonProps} from '../interfaces/componentsInterface/componentInterfaces';

const IconButton = ({
  renderIcon,
  customStyle,
  disabled,
  onPress,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        {borderColor: colors.black},
        customStyle,
      ]}>
      {renderIcon({})}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
