import React, {useState} from 'react';
import {useImperativeHandle} from 'react';
import {forwardRef} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ModalComponentProps} from '../interfaces/componentsInterface/componentInterfaces';
import appStyle from '../styles/appStyle';
import {Constants} from '../constants/constants';
import colors from '../constants/color';

const ModalComponent = forwardRef((props: ModalComponentProps, refer) => {
  const [modalVisible, setModalVisible] = useState(false);

  useImperativeHandle(refer, () => ({
    showModal() {
      setModalVisible(true);
    },
    dismissModal() {
      setModalVisible(false);
    },
  }));

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      supportedOrientations={['portrait', 'landscape']}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <GestureHandlerRootView style={{flex: 1}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setModalVisible(!modalVisible);
            props?.closeModal && props?.closeModal();
          }}
          style={[styles.centeredView]}>
          <View
            style={[
              styles.modalView,
              {
                width: Constants.deviceWidth - 20,
                backgroundColor: colors.white,
                minHeight: 230,
                justifyContent: 'center',
                height: 300,
                borderWidth: 1,
                borderColor: colors.border,
              },
            ]}>
            {props?.children}
          </View>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </Modal>
  );
});

export default ModalComponent;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    alignItems: 'center',
    shadowColor: '#000',
    borderRadius: 14,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
