import React, {useEffect, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import DashboardNavigator from './DashboardNavigator';
import AuthNavigator from './AuthNavigator';
import SplashScreen from '../screens/splashScreen/splashScreen';
import appStyle from '../styles/appStyle';
import {useAuthStore} from '../store/store';

const Navigation = () => {
  const [isPreloading, setIsPreloading] = useState<boolean>(true);
  const {isSuccess: isUserLogin} = useAuthStore();

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
