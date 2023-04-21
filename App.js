import React, {Component} from 'react'
import {View, StyleSheet, StatusBar} from 'react-native'
import 'react-native-gesture-handler'
import {Config} from './app/common'
import {Provider} from 'react-redux'
import {store, persistor} from './app/store'
import {PersistGate} from 'redux-persist/es/integration/react'
import {Configuration} from 'bugsnag-react-native'
import PushNotification from 'react-native-push-notification'
import SplashScreen from 'react-native-splash-screen'
import AppRouter from './app/navigation/Router'

const config = new Configuration('81610f634e956f713399d1f3efc6cc76')
config.codeBundleId = '2.0.0'
//TODO: Button to check for app updates
class App extends Component {
  constructor(props) {
    super(props)
    this.notification()
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  notification = () => {
    PushNotification.configure({
      onRegister: async function (token) {},
      onNotification: (notification) => {
        // console.warn('REMOTE NOTIFICATION ==>', notification);
      },

      senderID: '452141617982',
      popInitialNotification: true,
      requestPermissions: true,
    })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.appContainer}>
            <StatusBar
              backgroundColor={Config.primaryLight}
              barStyle="light-content"
            />
            <AppRouter />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
})

export default App
