import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Badge as BadgeComponent} from 'react-native-paper';
import colors from '../constants/color';
import {BadgeProps} from '../interfaces/componentsInterface/componentInterfaces';
import {useSelector} from 'react-redux';
import {RootState} from '../../App';

const Badge = ({count, customStyles, showBadge}: BadgeProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

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
