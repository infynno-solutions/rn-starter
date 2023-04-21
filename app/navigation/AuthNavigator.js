import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Forgot from '../components/Auth/Forgot'
import Otp from '../components/Auth/Otp'
import ResetPassword from '../components/Auth/ResetPassword'
import LoginScreen from '../components/Auth/LoginScreen'

const Stack = createNativeStackNavigator()

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator
