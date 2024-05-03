import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import useInternetStatus from '../hooks/useInternetStatus';
import {memo} from 'react';
import colors from '../constants/color';
import {HeaderProps} from '../interfaces/componentsInterface/componentInterfaces';

const Header = ({
  title,
  leftChildren,
  rightChildren,
  customStyles,
  titleStyles,
  customTitleContainerStyle,
  customRightChildStyle,
  customLeftChildStyle,
}: HeaderProps) => {
  const isInternetConnected = useInternetStatus();
  return (
    <>
      <View
        style={[
          styles.headerContainer,
          {backgroundColor: colors.white, borderBottomColor: colors.border},
          customStyles,
        ]}>
        <View style={[styles.leftChildContainer, customLeftChildStyle]}>
          {leftChildren}
        </View>
        {typeof title === 'string' ? (
          <View style={[styles.titleContainer, customTitleContainerStyle]}>
            <Text
              numberOfLines={1}
              style={[styles.titleStyle, {color: colors.black}, titleStyles]}>
              {title}
            </Text>
          </View>
        ) : (
          title
        )}
        <View style={[styles.rightChildContainer, customRightChildStyle]}>
          {rightChildren}
        </View>
      </View>
    </>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  leftChildContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
    left: 0,
    padding: 10,
  },
  rightChildContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 20,
    width: '70%',
    lineHeight: 24,
    textAlign: 'center',
  },
});
