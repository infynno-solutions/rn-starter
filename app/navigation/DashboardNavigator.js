import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {StyleSheet, TouchableOpacity, View} from 'react-native'
import Dashboard from '../components/Dashboard/Dashboard'
import Policies from '../components/Policies'
import {Config} from '../common'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AppDrawerStack from './DrawerNavigator'
import HolidaysScreen from '../components/Holidays/HolidaysScreen'
import RequestLeave from '../components/Leaves/RequestLeave'
import ProjectDetails from '../components/Tasks/ProjectDetails'
import EditLeave from '../components/Leaves/EditLeave'
import InterviewFeedback from '../components/Interviews/InterviewFeedback'
import InterviewScreen from '../components/Interviews/InterviewScreen'
import Logout from '../components/Auth/Logout'

const Stack = createNativeStackNavigator()

function DashboardNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AppDrawerStack"
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: 'white',
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
        headerTitle: Config.appName,
        headerTitleStyle: {
          color: 'black',
          fontSize: 20,
        },
        headerShown: true,
        headerTitleAlign: 'center',
      })}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={() => {
          return {
            headerShown: true,
          }
        }}
      />
      <Stack.Screen
        name="Policies"
        component={Policies}
        options={() => {
          return {
            headerShown: false,
          }
        }}
      />
      <Stack.Screen
        name="RequestLeave"
        component={RequestLeave}
        options={() => {
          return {
            headerShown: false,
          }
        }}
      />
      <Stack.Screen
        name="EditLeave"
        component={EditLeave}
        options={() => {
          return {
            headerShown: false,
          }
        }}
      />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetails}
        options={(props) => {
          return {
            headerShown: true,
            headerTitle: props?.route?.params?.projectName,
            headerRight: () => (
              <View style={styles.taskCardRightStyle}>
                <Logout navigation={props?.navigation} />
              </View>
            ),
          }
        }}
      />
      <Stack.Screen
        name="InterviewFeedback"
        component={InterviewFeedback}
        options={() => {
          return {
            headerShown: false,
          }
        }}
      />
      <Stack.Screen
        name="Interviews"
        component={InterviewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Holidays"
        component={HolidaysScreen}
        options={(props) => {
          return {
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Home')
                }}>
                <Icon name={'arrow-left'} size={24} color={'black'} />
              </TouchableOpacity>
            ),
            headerTitle: 'Holidays',
            headerTitleAlign: 'center',
            animation: 'slide_from_right',
            animationTypeForReplace: 'push',
          }
        }}
      />
      <Stack.Screen
        name="AppDrawerStack"
        component={AppDrawerStack}
        options={{headerShown: false, headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  )
}

export default DashboardNavigator

const styles = StyleSheet.create({
  taskCardRightStyle: {
    width: 90,
  },
})
