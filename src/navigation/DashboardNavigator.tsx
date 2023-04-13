// React
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsListType} from '../types/commonTypes';
import DashboardScreen from '../screens/dashboard/dashboard';

const Stack = createNativeStackNavigator<RootStackParamsListType>();

function DashboardNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}

export default DashboardNavigator;
