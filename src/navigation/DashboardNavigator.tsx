// React
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsListType} from '../types/CommonTypes';

// Screens
import DashboardScreen from '../screens/dashboard/Dashboard';

const Stack = createNativeStackNavigator<RootStackParamsListType>();

function DashboardNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}

export default DashboardNavigator;
