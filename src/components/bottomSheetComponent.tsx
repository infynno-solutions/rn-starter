import React, {useCallback, useState} from 'react';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useReducedMotion} from 'react-native-reanimated';
import colors from '../constants/color';
import {BottomSheetComponentProps} from '../interfaces/componentsInterface/componentInterfaces';
import appStyle from '../styles/appStyle';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../App';

const BottomSheetComponent = ({
  bottomSheetModalRef,
  snapPoints,
  children,
  index,
  enableContentPanningGesture,
  enableHandlePanningGesture,
  opacity,
  onDismiss,
  disableCloseOnOutsideClick,
  handleIndicatorStyle,
  onOpen,
}: BottomSheetComponentProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const reducedMotion = useReducedMotion();
  const handleSheetChanges = useCallback((index: number) => {
    onOpen && onOpen(index);
    if (index === -1) {
    } else {
    }
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      animateOnMount={!reducedMotion}
      snapPoints={snapPoints}
      onDismiss={onDismiss}
      detached={true}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustPan"
      backgroundStyle={{backgroundColor: 'transparent'}}
      handleIndicatorStyle={[
        {backgroundColor: colors.white},
        handleIndicatorStyle,
      ]}
      enableContentPanningGesture={enableContentPanningGesture}
      enableHandlePanningGesture={enableHandlePanningGesture}
      index={index}
      onChange={handleSheetChanges}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          opacity={opacity || 1}
          disappearsOnIndex={-1}
          appearsOnIndex={1}
          pressBehavior={disableCloseOnOutsideClick ? 'none' : 'close'}
        />
      )}>
      <View style={[appStyle.container, {backgroundColor: theme.background}]}>
        {children}
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheetComponent;
