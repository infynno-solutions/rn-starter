import React, {useCallback, useState} from 'react';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useReducedMotion} from 'react-native-reanimated';
import colors from '../constants/color';
import {BottomSheetComponentProps} from '../interfaces/componentsInterface/componentInterfaces';

export const BottomSheetWrapper = ({
  bottomSheetModalRef,
  snapPoints,
  children,
  index,
  enableContentPanningGesture,
  enableHandlePanningGesture,
  opacity,
  onClose,
  disableCloseOnOutsideClick,
}: BottomSheetComponentProps) => {
  const [bottomSheetState, setBottomSheetState] = useState('closed');
  const reducedMotion = useReducedMotion();

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setBottomSheetState('closed');
    } else {
      setBottomSheetState('opened');
    }
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      onClose={onClose}
      animateOnMount={!reducedMotion}
      backgroundStyle={{backgroundColor: 'transparent'}}
      handleIndicatorStyle={{backgroundColor: colors.white}}
      enableContentPanningGesture={enableContentPanningGesture}
      enableHandlePanningGesture={enableHandlePanningGesture}
      index={index}
      $modal
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
      <BottomSheetView style={{flex: 1}}>{children}</BottomSheetView>
    </BottomSheet>
  );
};
