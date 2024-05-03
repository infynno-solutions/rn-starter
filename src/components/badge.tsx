import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Badge as BadgeComponent} from 'react-native-paper';
import colors from '../constants/color';
import {BadgeProps} from '../interfaces/componentsInterface/componentInterfaces';

const Badge = ({count, customStyles, showBadge}: BadgeProps) => {
  if (showBadge)
    return (
      <BadgeComponent style={[styles.badgeContainer, customStyles]}>
        {count}
      </BadgeComponent>
    );
  return null;
};
export default memo(Badge);

export const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: colors.black,
    color: colors.white,
  },
});
