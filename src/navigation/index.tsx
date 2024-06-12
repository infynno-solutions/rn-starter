import React, {useEffect, useState} from 'react';
import {Linking, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import DashboardNavigator from './dashboardNavigator';
import AuthNavigator from './authNavigator';
import {ApplicationState} from '../types/CommonTypes';
import SplashScreen from '../screens/splashScreen/splashScreen';
import appStyle from '../styles/appStyle';

import CustomAlert from '../components/customAlert';
import {useThemeStore} from '../store/theme-store';
import {useAuthStore} from '../store/auth-store';

const Navigation = () => {
  const [isPreloading, setIsPreloading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(true);
  const {userData: user}: {userData: any} = useAuthStore();
  const {theme} = useThemeStore();

  const isUserLogin = user?.user;
  useEffect(() => {
    setTimeout(() => setIsPreloading(false), 3000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[appStyle.container, {backgroundColor: theme.background}]}>
        <CustomAlert
          displayTitle="🚀  Update Available!  🚀"
          hideDismissButton={false}
          cancelButtonText="Later"
          isHtml={false}
          displayMsg={
            "Get ready for a smoother, faster experience with our latest update. Tap 'Update' now to enjoy the best version of CyberPedia!"
          }
          dismissAlert={() => setShowModal(false)}
          onPressButton={() => setShowModal(false)}
          visibility={showModal && !isPreloading}
          buttonText={'Update'}
        />
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
