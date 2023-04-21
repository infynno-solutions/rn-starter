import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Image,
  Alert,
} from 'react-native'

import BottomNavigator from './BottomTabNavigator'
import {Config} from '../common'
import {useDispatch, useSelector} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {getCurrentScreen, logoutUser} from '../components/Auth/AuthActions'
import {useNavigation, DrawerActions} from '@react-navigation/native'
import Images from '../../assets/images'
import Logout from '../components/Auth/Logout'

const Drawer = createDrawerNavigator()

const DrawerItem = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.navItem, {paddingHorizontal: 20, paddingVertical: 5}]}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderRadius: 8,
          backgroundColor: props?.currentScreen && Config.primayColor,
        }}>
        <View style={{width: 30}}>
          {props?.images ? (
            <Image
              source={props?.iconName}
              style={{
                width: 20,
                height: 20,
                tintColor: props?.currentScreen && 'white',
              }}
            />
          ) : (
            <Icon
              name={props?.iconName}
              size={24}
              color={props?.currentScreen && 'white'}
            />
          )}
        </View>
        <Text
          style={[styles.navTitle, {color: props?.currentScreen && 'white'}]}>
          {props.Title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

function AppDrawerStack() {
  const dispatch = useDispatch()
  const {profile} = useSelector((state) => state.ProfileReducers)
  const {currentScreen} = useSelector((state) => state.AuthReducers)

  const navigation = useNavigation()

  const CustomDrawerContent = (props) => {
    const screenOnPress = (screenName, title) => {
      title && dispatch(getCurrentScreen(title))
      props.navigation.navigate(screenName)
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <DrawerContentScrollView
          showsVerticalScrollIndicator={false}
          {...props}>
          <View
            style={[
              styles.navItem,
              {
                paddingHorizontal: 10,
                paddingTop: 8,
                height: 200,
                justifyContent: 'center',
              },
            ]}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <View style={styles.avatarWrapper}>
                <Image
                  style={styles.avatarImage}
                  source={
                    profile?.image_url
                      ? {
                          uri: profile?.image_url,
                        }
                      : Images.emptyProfile
                  }
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Text
                  style={[styles.navTitle, {fontWeight: 'bold', fontSize: 20}]}>
                  {profile?.full_name}
                </Text>
                <Text
                  style={[styles.navTitle, {fontWeight: '400', fontSize: 14}]}>
                  {profile?.email}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#00000033',
              borderBottomWidth: 1,
              marginVertical: 10,
            }}
          />

          <View>
            <DrawerItem
              Title="Home"
              onPress={() => screenOnPress('Home', 'Dashboard')}
              iconName="home"
              currentScreen={currentScreen === 'Dashboard'}
            />
            <DrawerItem
              Title="Projects"
              onPress={() => screenOnPress('ProjectsStack', 'Projects')}
              iconName={Images.project}
              images={true}
              currentScreen={currentScreen === 'Projects'}
            />
            <DrawerItem
              Title="Leaves"
              onPress={() => screenOnPress('LeavesStack', 'Leaves')}
              iconName="calendar-month"
              currentScreen={currentScreen === 'Leaves'}
            />
            <DrawerItem
              Title="Profile"
              onPress={() => screenOnPress('Profile', 'Profile')}
              iconName={Images.profile}
              images={true}
              currentScreen={currentScreen === 'Profile'}
            />
            <DrawerItem
              Title="Interviews"
              onPress={() => {
                screenOnPress('Interviews')
                navigation.dispatch(DrawerActions.closeDrawer())
              }}
              iconName={Images.interview}
              images={true}
              currentScreen={currentScreen === 'Interviews'}
            />
            <DrawerItem
              Title="Holidays"
              onPress={() => screenOnPress('Holidays')}
              iconName="calendar-month"
              currentScreen={currentScreen === 'Holidays'}
            />
            <DrawerItem
              Title="Policies"
              onPress={() => {
                screenOnPress('Policies')
                navigation.dispatch(DrawerActions.closeDrawer())
              }}
              iconName={Images.policy}
              images={true}
              currentScreen={currentScreen === 'Policies'}
            />
          </View>
        </DrawerContentScrollView>
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            style={[styles.btnBlack]}
            onPress={() => {
              Alert.alert(Config.appName, 'Are you sure you want to logout?', [
                {
                  text: 'No',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    dispatch(logoutUser(props?.navigation))
                  },
                },
              ])
            }}>
            <Text style={[styles.btnText]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <Drawer.Navigator
      screenOptions={() => ({
        drawerStyle: {
          backgroundColor: 'white',
          width: '70%',
        },
        headerStyle: styles.headerStyle,
        headerTitleAlign: 'center',
        headerTitle: '',
        headerTitleStyle: styles.headerTitleStyle,
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="BottomNavigator">
      <Drawer.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={(props) => {
          return {
            headerShown: true,
            headerLeft: () => (
              <View
                style={{
                  marginLeft: 50,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => props.navigation.toggleDrawer()}>
                  <Icon name={'menu'} size={40} color={'white'} />
                </TouchableOpacity>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 20,
                  }}>
                  <Image
                    source={Images.logo}
                    style={{
                      width: 50,
                      height: 40,
                      marginRight: 20,
                      tintColor: 'white',
                    }}
                  />
                  <Text style={styles.headerTitleStyle}>{Config.appName}</Text>
                </View>
              </View>
            ),
            headerRight: () => <Logout navigation={navigation} />,
          }
        }}
      />
    </Drawer.Navigator>
  )
}

export default AppDrawerStack

const styles = StyleSheet.create({
  mainHeaderIcon: {
    width: 2,
    height: 30,
  },
  headerStyle: {
    shadowOpacity: 0,
    shadowOffset: {height: 0},
    elevation: 0,
    height: 70,
    backgroundColor: Config.primaryLight,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    color: 'green',
    textAlign: 'center',
    marginTop: 2,
  },

  headerTitleStyle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  btnBlack: {
    width: '100%',
    backgroundColor: Config.primayColor,
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  navItem: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'space-between',
  },
  navTitle: {
    fontSize: 16,
    color: 'black',
    paddingLeft: 10,
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    // borderRadius: '50%',
    margin: 15,
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalLineStyle: {
    borderBottomColor: '#0000001A',
    borderBottomWidth: 1,
    marginVertical: 2,
    marginLeft: 20,
  },
})
