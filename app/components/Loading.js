import React, {Component} from 'react'
import {View, StyleSheet, Image, Dimensions} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {Config} from '../common'

const {width} = Dimensions.get('window')
class Loading extends Component {
  componentDidMount() {
    this.getStatus()
  }

  getStatus = async () => {
    const loginStatus = await AsyncStorage.getItem('isLoggedIn')

    if (loginStatus === null) {
      this.props.navigation.navigate('Auth')
      return false
    } else {
      this.props.navigation.navigate('App')
      return true
    }
  }
  render() {
    return (
      <View testID="splash" style={styles.loadingContainer}>
        <Image source={require('../logo.png')} style={styles.logoImage} />
      </View>
    )
  }
}

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

export default Loading
