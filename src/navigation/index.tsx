import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DashboardNavigator from './DashboardNavigator';
import AuthNavigator from './AuthNavigator';

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
      <NavigationContainer>
        {isUserLogin ? <DashboardNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    );
  }
};

export default Navigation;
