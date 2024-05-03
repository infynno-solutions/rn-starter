import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import DashboardNavigator from './dashboardNavigator';
import AuthNavigator from './authNavigator';
import {ApplicationState} from '../types/CommonTypes';
import SplashScreen from '../screens/splashScreen/splashScreen';
import appStyle from '../styles/appStyle';

const Navigation = () => {
  const [isPreloading, setIsPreloading] = useState<boolean>(true);
  const user: any = useSelector(
    (state: ApplicationState) => state.auth.userData,
  );
  const isUserLogin = user?.user;
  useEffect(() => {
    setTimeout(() => setIsPreloading(false), 3000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={appStyle.container}>
        <NavigationContainer>
          {isPreloading ? (
            <SplashScreen />
          ) : isUserLogin ? (
            <DashboardNavigator />
          ) : (
            <AuthNavigator />
          )}
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Navigation;
