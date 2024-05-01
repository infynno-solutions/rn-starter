import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {DashboardScreenProps} from '../../types/commonTypes';
import appStyle from '../../styles/appStyle';
import {signOut} from '../../services/firebase';
import {useDispatch} from 'react-redux';
import {clearAuth} from '../../store/auth/authSlice';
import {persistStore} from 'redux-persist';
import store from '../../store/store';
let persistor = persistStore(store);

const DashboardScreen: FC<DashboardScreenProps> = () => {
  const dispatch = useDispatch();
  return (
    <View style={appStyle.container3}>
      <Text
        onPress={() => {
          signOut();
          dispatch(clearAuth());
          persistor.flush();
          persistor.purge();
        }}>
        Logout
      </Text>
    </View>
  );
};

export default DashboardScreen;
