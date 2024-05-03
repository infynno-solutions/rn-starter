import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../constants/color';
import {EmptyRecordProps} from '../interfaces/componentsInterface/componentInterfaces';

const EmptyRecord = ({
  message,
  showIcon = false,
  renderIcon,
  secondMessage,
  customMessageStyle,
  customSubtitleStyle,
}: EmptyRecordProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        },
      ]}>
      {showIcon && (
        <View style={styles.imageContainer}>
          {renderIcon && renderIcon({})}
        </View>
      )}
      {message && (
        <Text style={[styles.comingMessageStyle, customMessageStyle]}>
          {message}
        </Text>
      )}
      {secondMessage && (
        <Text style={[styles.secondMessageStyle]}>{secondMessage}</Text>
      )}
    </View>
  );
};

export default EmptyRecord;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },

  comingMessageStyle: {
    paddingVertical: 5,
    fontSize: 22,
    color: colors.black,
    fontWeight: '500',
    lineHeight: 24,
  },
  imageContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 100,
    backgroundColor: colors._BBBBBB,
    marginVertical: 10,
  },
  secondMessageStyle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.black,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24,
  },
});
