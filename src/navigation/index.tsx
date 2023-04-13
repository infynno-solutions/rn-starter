import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import DashboardNavigator from './DashboardNavigator';
import AuthNavigator from './AuthNavigator';
import {ApplicationState} from '../types/commonTypes';
import SplashScreen from '../screens/splashScreen/splashScreen';
import appStyle from '../styles/appStyle';

const Navigation = () => {
  const [isPreloading, setIsPreloading] = useState<boolean>(true);
  const isUserLogin = useSelector(
    (state: ApplicationState) => state.auth.isSuccess,
  );

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
