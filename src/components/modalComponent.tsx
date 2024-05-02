import React, {useState} from 'react';
import {useImperativeHandle} from 'react';
import {forwardRef} from 'react';
import {Modal} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ModalComponentProps} from '../interfaces/componentsInterface/componentInterfaces';

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
        {props?.children}
      </GestureHandlerRootView>
    </Modal>
  );
});

export default ModalComponent;
