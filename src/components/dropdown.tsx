import React, {useMemo, useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import BottomSheetComponent from './BottomSheetComponent';
import colors from '../constants/color';
import {showToast_info} from '../utils/helper';
import appStyle from '../styles/appStyle';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {DropdownProps} from '../interfaces/componentsInterface/componentInterfaces';

const DropDown = ({
  data,
  label,
  customIcon,
  placeHolder,
  brColor,
  customStyles,
  customDropdownLabelStyle,
  customLabelStyle,
  selectedValue,
  onChangeValue,
  dataKey,
  defaultIndex,
  disabled,
  isLoading,
  disableKey,
  disableCompareValue,
  showClear,
  onClear,
}: DropdownProps) => {
  const [value, setValue] = useState(selectedValue);
  const snapPoints = useMemo(() => ['50%', '60%', '80%'], []);
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const selectValue = (item: any) => {
    setValue(item);
    onChangeValue && onChangeValue(item);
    bottomSheetModalRef?.current?.dismiss();
  };

  return (
    <View style={styles.mainContainer}>
      {label && (
        <Text
          numberOfLines={1}
          style={[styles.textStyle, {color: colors._C2C2C2}, customLabelStyle]}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        disabled={disabled || false}
        onPress={() => {
          if (data?.length > 0) {
            bottomSheetModalRef?.current?.present();
          } else {
            showToast_info('Info', 'No Record found');
          }
        }}
        activeOpacity={0.7}
        style={[
          styles.DropDownStyle,
          {
            borderColor: brColor ? brColor : colors.black,
          },
          customStyles,
        ]}>
        <Text
          numberOfLines={1}
          style={[
            styles.valueStyle,
            {color: value ? colors.black : colors._C2C2C2},
          ]}>
          {value?.label || value[dataKey] || 'Select'}
        </Text>

        {customIcon ? (
          customIcon({})
        ) : (
          <View style={{transform: [{rotate: '270deg'}]}}>
            {isLoading ? (
              <ActivityIndicator size={'small'} color={colors.black} />
            ) : (
              <Text>ArrowIcon</Text>
              //   <BackArrowIcon height={12} width={8} fillColor={colors.icon} />
            )}
          </View>
        )}
      </TouchableOpacity>
      <BottomSheetComponent
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        index={defaultIndex || 2}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        opacity={0.5}>
        <View
          style={[styles.dropdownContainer, {backgroundColor: colors.white}]}>
          <FlatList
            ListHeaderComponent={() => {
              return (
                <View style={appStyle.rowContainer}>
                  <Text
                    style={[
                      styles.sectionTitle,
                      {color: colors._BBBBBB},
                      customDropdownLabelStyle,
                      showClear && {flex: 1},
                    ]}>
                    {label || placeHolder}
                  </Text>
                  {showClear && (
                    <Text
                      onPress={() => onClear && onClear()}
                      numberOfLines={1}
                      style={[styles.sectionTitle, {color: colors.red}]}>
                      Clear All
                    </Text>
                  )}
                </View>
              );
            }}
            data={data || []}
            renderItem={({item, index}) => {
              const isDisabled =
                item[disableKey] !== undefined || item[disableKey] !== undefined
                  ? disableCompareValue !== undefined
                    ? item[disableKey] === disableCompareValue
                    : false
                  : false;
              return (
                <TouchableOpacity
                  onPress={() => {
                    selectValue(item);
                  }}
                  key={index}
                  disabled={isDisabled}
                  style={[
                    styles.rowItemContainer,
                    {borderBottomColor: colors.border},
                    // isDisabled
                    //   ? {
                    //       backgroundColor: colors.border,
                    //     }
                    //   : {},
                  ]}>
                  <Text
                    style={[
                      styles.itemTextStyle,
                      {color: colors.black},
                      {opacity: isDisabled ? 0.5 : 1},
                    ]}>
                    {item?.label || item[dataKey]}
                  </Text>
                  {value[dataKey || 'value'] === item[dataKey || 'value'] && (
                    // <CheckIcon fillColor={Colors.primaryRedColor} />
                    <Text>CheckIconHere</Text>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </BottomSheetComponent>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 8,
  },
  valueStyle: {
    flex: 1,
    fontSize: 14,
    paddingRight: 10,
    lineHeight: 20,
    fontWeight: '400',
    fontStyle: 'normal',
  },
  DropDownStyle: {
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordDropDownStyle: {
    flex: 1,
  },
  textStyle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    fontStyle: 'normal',
    paddingVertical: 5,
  },
  dropdownContainer: {
    flex: 1,

    paddingVertical: '5%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  rowItemContainer: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  itemTextStyle: {
    flex: 1,
    fontWeight: '400',
    fontSize: 14,

    lineHeight: 20,
  },
  sectionTitle: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});
