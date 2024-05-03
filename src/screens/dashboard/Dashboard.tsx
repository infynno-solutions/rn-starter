import React, {FC, MutableRefObject, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {DashboardScreenProps} from '../../types/commonTypes';
import appStyle from '../../styles/appStyle';
import {signOut} from '../../services/firebase';
import {useDispatch} from 'react-redux';
import {clearAuth} from '../../store/auth/authSlice';
import {persistStore} from 'redux-persist';
import store from '../../store/store';
import Accordion from '../../components/accordion';
import Header from '../../components/header';
import Avatar from '../../components/Avatar';
import Badge from '../../components/badge';
import Button from '../../components/button';
import CustomImageLoader from '../../components/customImageLoader';
import DropDown from '../../components/dropdown';
import {
  DropdownValueProps,
  ModalRefProps,
} from '../../interfaces/componentsInterface/componentInterfaces';
import BottomSheetComponent from '../../components/bottomSheetComponent';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import ModalComponent from '../../components/modalComponent';
import OnBaordingPager from '../../components/onboardingPager';
import TileScrolling from '../../components/tileScrolling';
import {ScrollView} from 'react-native-gesture-handler';
import AnimatedTileScrolling from '../../components/AnimatedTileScrolling';
import AnimatedInput from '../../components/animatedTextBox';
import Loader2 from '../../components/loader';
import Loader3 from '../../components/loader3';
import InputText from '../../components/inputText';
import colors from '../../constants/color';

let persistor = persistStore(store);

const DashboardScreen: FC<DashboardScreenProps> = () => {
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const modalRef = useRef<ModalRefProps>(null);
  const [selectedValue, setDropdown] = useState<DropdownValueProps>();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={appStyle.container}>
      <Header
        title="Home"
        leftChildren={[
          <>
            <Avatar
              source={{
                uri: 'https://www.signivis.com/img/custom/avatars/member-avatar-01.png',
              }}
            />
            <Badge showBadge={true} count={10} />
          </>,
        ]}
        rightChildren={[
          <Text
            onPress={() => {
              signOut();
              dispatch(clearAuth());
              persistor.flush();
              persistor.purge();
            }}>
            Logout
          </Text>,
        ]}
      />
      <ScrollView>
        <View
          style={[
            appStyle.rowContainer,
            {width: '100%', height: 120, justifyContent: 'center'},
          ]}>
          <CustomImageLoader isLoading={true} />
          <Loader2 />
          <Loader3 />
        </View>
        <AnimatedInput value={name} onChangeText={setName} placeholder="Name" />

        <InputText
          label={'Password'}
          textContentType="oneTimeCode"
          value={password}
          onChangeText={setPassword}
          type={'Password'}
          brColor={colors.border}
        />

        <Button
          title="BottomSheetComponent"
          onPress={() => {
            bottomSheetModalRef?.current?.present();
          }}
        />
        <Button
          title="Modal"
          onPress={() => {
            modalRef?.current?.showModal();
          }}
        />
        <Accordion
          data={[
            {
              label: 'Accordion 1',
              value: 1,
              itemData: [
                {label: 'Data 1', value: 1},
                {label: 'Data 1', value: 1},
                {label: 'Data 1', value: 1},
              ],
            },
          ]}
        />
        <DropDown
          selectedValue={selectedValue || {}}
          dataKey="label"
          data={[
            {label: 'Data 1', value: 1, name: 'Data 1'},
            {label: 'Data 2', value: 2, name: 'Data 2'},
          ]}
          onChangeValue={e => {
            setDropdown(e);
          }}
        />
        <View style={[appStyle.container, {flex: 0, height: 120}]}>
          <OnBaordingPager
            indicatorAnimationType="STRETCH"
            data={['gray', 'black']}
          />
        </View>
        <View style={[appStyle.container, {flex: 0, marginTop: 10}]}>
          <TileScrolling data={[1, 2, 3, 4]} />
        </View>
        <View style={[appStyle.container, {flex: 0, marginTop: 10}]}>
          <AnimatedTileScrolling data={[1, 2, 3, 4]} />
        </View>
      </ScrollView>
      <BottomSheetComponent
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={['50%']}
        index={0}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}>
        <View>
          <Text>Test</Text>
        </View>
      </BottomSheetComponent>
      <ModalComponent ref={modalRef}>
        <Text>modal</Text>
      </ModalComponent>
    </View>
  );
};

export default DashboardScreen;
