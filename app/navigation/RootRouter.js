import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import LoginScreen from '../components/Auth/LoginScreen'
import Forgot from '../components/Auth/Forgot'
import Otp from '../components/Auth/Otp'
import ResetPassword from '../components/Auth/ResetPassword'
import ProjectsScreen from '../components/Projects/ProjectsScreen'
import ProjectDetails from '../components/Tasks/ProjectDetails'
import LeavesScreen from '../components/Leaves/LeavesScreen'
import RequestLeave from '../components/Leaves/RequestLeave'
import EditLeave from '../components/Leaves/EditLeave'
import HolidaysScreen from '../components/Holidays/HolidaysScreen'
import Loading from '../components/Loading'
import Profile from '../components/Profile/EditProfile'
import Dashboard from '../components/Dashboard/Dashboard'
import Policies from '../components/Policies/index'
import InterviewScreen from '../components/Interviews/InterviewScreen'
import InterviewFeedback from '../components/Interviews/InterviewFeedback'

import {Config} from '../common'
import Logout from '../components/Auth/Logout'

const DashboardStack = createStackNavigator(
  {
    Dashboard: Dashboard,
  },
  {
    navigationOptions: ({navigation}) => ({
      title: 'Dashboard',
      tabBarIcon: () => <Icon name="home" color="#fff" size={20} />,
      tabBarTestID: 'Dashboard',
      // tabBarLabel: () => null,
    }),
  }
)

const ProjectsStack = createStackNavigator(
  {
    Projects: ProjectsScreen,
    ProjectDetails: ProjectDetails,
  },
  {
    navigationOptions: ({navigation}) => ({
      title: 'Projects',
      // tabBarVisible: navigation.state.index < 1,
    }),
  }
)

const LeavesStack = createStackNavigator(
  {
    Leaves: LeavesScreen,
    RequestLeave: RequestLeave,
    EditLeave: EditLeave,
  },
  {
    navigationOptions: () => ({
      title: 'Leaves',
    }),
  }
)

const InterviewStack = createStackNavigator(
  {
    Interviews: InterviewScreen,
    InterviewFeedback: InterviewFeedback,
  },
  {
    navigationOptions: () => ({
      title: 'Interviews',
    }),
  }
)

const HolidaysStack = createStackNavigator(
  {Holidays: HolidaysScreen},
  {
    navigationOptions: () => ({
      title: 'Holidays',
    }),
  }
)

const ProfileStack = createStackNavigator(
  {
    Profile: Profile,
  },
  {
    navigationOptions: () => ({
      title: 'Profile',
    }),
  }
)

const PoliciesStack = createStackNavigator(
  {
    Policies: Policies,
  },
  {
    navigationOptions: () => ({
      title: 'Policies',
    }),
  }
)

const TabsNavigation = createMaterialTopTabNavigator(
  {
    DashboardStack,
    ProjectsStack,
    LeavesStack,
    InterviewStack,
    HolidaysStack,
    ProfileStack,
    PoliciesStack,
  },
  {
    initialRouteName: 'DashboardStack',
    swipeEnabled: true,
    tabBarOptions: {
      scrollEnabled: true,
      // showIcon: true,
      style: {
        backgroundColor: Config.primayColor,
      },
      tabStyle: {
        width: 120,
      },
      indicatorStyle: {
        backgroundColor: '#fff',
      },
      labelStyle: {fontWeight: 'bold', fontSize: 14},
    },
    lazy: true,
  }
)

const AppStack = createStackNavigator(
  {TabsNavigation},
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerTitle: Config.appName,
      headerRight: () => <Logout navigation={navigation} />,
      headerStyle: {
        backgroundColor: Config.primayColor,
        elevation: 0,
      },
      headerTitleStyle: {
        color: '#fff',
        fontWeight: 'bold',
      },
    }),
  }
)

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Forgot: Forgot,
  Otp: Otp,
  ResetPassword: ResetPassword,
})

const Swtich = createSwitchNavigator(
  {
    Loading: Loading,
    Auth: AuthStack,
    App: AppStack,
  },
  {initialRouteName: 'Loading'}
)

export default createAppContainer(Swtich)
