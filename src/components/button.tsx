import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import colors from '../constants/color';
import {ButtonProps} from '../interfaces/componentsInterface/componentInterfaces';

const Button = ({
  onPress,
  loadingComponent,
  customStyle,
  labelStyle,
  title,
  disabled,
  isLoading,
  icon,
  buttonWidth,
  buttonHeight,
  textColor,
  outlined,
  numberOfLines,
  borderColor,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        {
          width: buttonWidth ? buttonWidth : '95%',
          height: buttonHeight ? buttonHeight : 48,
          backgroundColor: outlined ? colors.transparent : colors.black,
          borderColor: borderColor ? borderColor : colors.black,
        },
        customStyle,
        disabled && {opacity: 0.4},
      ]}>
      {isLoading ? (
        loadingComponent ? (
          loadingComponent({})
        ) : (
          <ActivityIndicator
            color={outlined ? colors.black : colors.white}
            size="small"
          />
        )
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            numberOfLines={numberOfLines || 1}
            style={[
              styles.titleStyle,
              {color: outlined ? colors.black : colors.white},
              labelStyle,
            ]}>
            {title}
          </Text>
        </View>
      )}
      {icon && <View style={{marginStart: 30}}>{icon}</View>}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 6,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1,
  },
  titleStyle: {
    fontWeight: '400',
    fontSize: 15,
  },
});
