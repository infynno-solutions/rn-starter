import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../constants/color';
import {IconContentCardProps} from '../interfaces/componentsInterface/componentInterfaces';
import appStyle from '../styles/appStyle';

const IconContentCard = ({
  title,
  icon,
  subtitle,
  customLabelStyle,
}: IconContentCardProps) => {
  return (
    <View style={styles.containerStyle}>
      <View style={[styles.iconContainer, {backgroundColor: colors.lightgray}]}>
        {icon({})}
      </View>
      <View style={{paddingLeft: 15}}>
        <Text style={[appStyle.smallText, {color: colors.grey}]}>{title}</Text>
        <Text style={[appStyle.bodyText, customLabelStyle]}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default IconContentCard;

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,

    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
