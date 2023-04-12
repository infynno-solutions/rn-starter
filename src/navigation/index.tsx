import React, {useEffect, useState} from 'react';
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import {NavigationContainer} from '@react-navigation/native';
import DashboardNavigator from './DashboardNavigator';
import AuthNavigator from './AuthNavigator';
import store from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';


let persistor = persistStore(store);

const Navigation = () => {
  const [isPreloading, setIsPreloading] = useState<boolean>(true);

  const isUserLogin = false;

  useEffect(() => {
    async function fetchData() {
      setIsPreloading(false);
    }
    fetchData();
  }, []);

  if (isPreloading) {
    return null;
  } else {
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
      <NavigationContainer>
        {isUserLogin ? <DashboardNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      </SafeAreaProvider>
      </PersistGate>
      </Provider>
    );
  }
};

export default Navigation;
