import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Badge as BadgeComponent} from 'react-native-paper';
import {BadgeProps} from '../interfaces/componentsInterface/componentInterfaces';
import {useThemeStore} from '../store/theme-store';

const Badge = ({count, customStyles, showBadge}: BadgeProps) => {
  const {theme} = useThemeStore();

  if (showBadge)
    return (
      <BadgeComponent
        style={[
          styles.badgeContainer,
          {backgroundColor: theme.text, color: theme.background},
          customStyles,
        ]}>
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
  },
});
