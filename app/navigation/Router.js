import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import DashboardNavigator from './DashboardNavigator'
import AsyncStorage from '@react-native-community/async-storage'
import {View, Image, StyleSheet, Dimensions} from 'react-native'
import {Config} from '../common'
import AuthNavigator from './AuthNavigator'
import {useDispatch, useSelector} from 'react-redux'
import {setUserLogin} from '../components/Auth/AuthActions'

const {width} = Dimensions.get('window')

const AppRouter = () => {
  const {isUserLogin} = useSelector((state) => state.AuthReducers)

  const dispatch = useDispatch()
  const [isPreloading, setIsPreloading] = React.useState(true)

  const onLoadEffect = () => {
    ;(async () => {
      const token = await AsyncStorage.getItem('token')

      if (token) {
        dispatch(setUserLogin(true, token))
      }
      setIsPreloading(false)
    })()
  }
  React.useEffect(onLoadEffect, [dispatch])

  if (isPreloading) {
    return (
      <View testID="splash" style={styles.loadingContainer}>
        <Image source={require('../logo.png')} style={styles.logoImage} />
      </View>
    )
  } else {
    return (
      <NavigationContainer>
        {isUserLogin ? <DashboardNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    )
  }
}

export default AppRouter

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Config.primayColor,
  },
  logoText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  logoImage: {width: width / 2, height: 100, resizeMode: 'contain'},
})
