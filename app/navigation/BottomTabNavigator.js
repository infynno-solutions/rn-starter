import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Dashboard from '../components/Dashboard/Dashboard'
import ProjectsScreen from '../components/Projects/ProjectsScreen'
import LeavesScreen from '../components/Leaves/LeavesScreen'
import Profile from '../components/Profile/EditProfile'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {Text, StyleSheet, View, Image} from 'react-native'
import {Config} from '../common'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Images from '../../assets/images'

const Tab = createBottomTabNavigator()
const ProjectsStack = createNativeStackNavigator()
const LeavesStack = createNativeStackNavigator()

const ProjectsStackScreen = () => {
  return (
    <ProjectsStack.Navigator>
      <ProjectsStack.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{headerShown: false}}
      />
    </ProjectsStack.Navigator>
  )
}

const LeavesStackScreen = () => {
  return (
    <LeavesStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <LeavesStack.Screen name="Leaves" component={LeavesScreen} />
    </LeavesStack.Navigator>
  )
}

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarStyle: styles.tabBarStyle,
        headerTransparent: true,
        headerTitle: '',
        headerShown: true,

        headerTitleStyle: {
          color: 'black',
          fontSize: 25,
        },
        headerTitleAlign: 'left',
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingTop: 0,
          paddingBottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({focused}) => {
          let iconName
          if (route.name === 'Home') {
            return (
              <View
                style={[
                  styles.tabStyle,
                  (iconName = focused ? {opacity: 1} : null),
                ]}>
                <View
                  style={[
                    (iconName = focused
                      ? styles.tabIconActive
                      : styles.tabIcon),
                  ]}>
                  <Icon
                    name="home"
                    size={24}
                    color={(iconName = focused ? Config.primayColor : 'black')}
                  />
                </View>
                <Text
                  style={[
                    (iconName = focused ? styles.labelActive : styles.label),
                  ]}>
                  Home
                </Text>
              </View>
            )
          } else if (route.name === 'ProjectsStack') {
            return (
              <View
                style={[
                  styles.tabStyle,
                  (iconName = focused ? {opacity: 1} : null),
                ]}>
                <View
                  style={[
                    (iconName = focused
                      ? styles.tabIconActive
                      : styles.tabIcon),
                  ]}>
                  <Image
                    source={Images.project}
                    style={[
                      (iconName = focused
                        ? styles.tabImageActive
                        : styles.tabImage),
                    ]}
                  />
                </View>
                <Text
                  style={[
                    (iconName = focused ? styles.labelActive : styles.label),
                  ]}>
                  Projects
                </Text>
              </View>
            )
          } else if (route.name === 'LeavesStack') {
            return (
              <View
                style={[
                  styles.tabStyle,
                  (iconName = focused ? {opacity: 1} : null),
                ]}>
                <View
                  style={[
                    (iconName = focused
                      ? styles.tabIconActive
                      : styles.tabIcon),
                  ]}>
                  <Icon
                    name="calendar-month"
                    size={24}
                    color={(iconName = focused ? Config.primayColor : 'black')}
                  />
                </View>
                <Text
                  style={[
                    (iconName = focused ? styles.labelActive : styles.label),
                  ]}>
                  Leaves
                </Text>
              </View>
            )
          } else {
            return (
              <View
                style={[
                  styles.tabStyle,
                  (iconName = focused ? {opacity: 1} : null),
                ]}>
                <View
                  style={[
                    (iconName = focused
                      ? styles.tabIconActive
                      : styles.tabIcon),
                  ]}>
                  <Image
                    source={Images.profile}
                    style={[
                      (iconName = focused
                        ? styles.tabImageActive
                        : styles.tabImage),
                    ]}
                  />
                </View>
                <Text
                  style={[
                    // eslint-disable-next-line no-unused-vars
                    (iconName = focused ? styles.labelActive : styles.label),
                  ]}>
                  Profile
                </Text>
              </View>
            )
          }
        },
      })}>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="ProjectsStack" component={ProjectsStackScreen} />
      <Tab.Screen name="LeavesStack" component={LeavesStackScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default BottomNavigator

const styles = StyleSheet.create({
  tabStyle: {
    opacity: 0.32,
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 2,
  },
  tabIcon: {
    alignSelf: 'center',
  },
  tabIconActive: {
    alignSelf: 'center',
  },
  tabBarStyle: {
    backgroundColor: 'white',
    height: 60,
  },
  labelActive: {
    color: Config.primayColor,
    fontSize: 14,
    marginTop: 2,
    fontWeight: 'bold',
  },
  label: {
    color: 'black',
    fontSize: 14,
    marginTop: 2,
    fontWeight: 'bold',
  },
  tabImage: {
    width: 25,
    height: 25,
    tintColor: 'black',
  },
  tabImageActive: {
    width: 25,
    height: 25,
    tintColor: Config.primayColor,
  },
})
