import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';
import {RootStackParamsListType} from '../types/CommonTypes';
import LoginScreen from '../screens/auth/Login';
import ChangePasswordScreen from '../screens/auth/ChangePassword';
import SignupScreen from '../screens/auth/Signup';

const Stack = createNativeStackNavigator<RootStackParamsListType>();

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        animationTypeForReplace: 'push',
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
