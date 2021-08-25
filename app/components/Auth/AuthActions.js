import {Config} from '../../common'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ToastMessage from '../Toast'
import axiosInterceptors from '../../api'
import PushNotification from 'react-native-push-notification'

export const loginUser = (user, navigation) => {
  return dispatch => {
    dispatch({type: 'LOGIN_INPROGRESS'})

    axios
      .post(`${Config.apiUrl}/login`, user)
      .then(async res => {
        if (res.data.success === true) {
          ToastMessage(res.data.message)
          AsyncStorage.setItem('isLoggedIn', 'true')
          AsyncStorage.setItem('token', res.data.data.token)

          PushNotification.configure({
            onRegister: async function(device) {
              await updateDeviceToken(device.token)
            },
          })

          navigation.navigate('Dashboard')
          dispatch({type: 'LOGIN_SUCCESS', payload: res.data.data})
        } else {
          ToastMessage(res.data.message, true)
          dispatch({type: 'LOGIN_FAILURE', payload: res.data.message})
        }
      })
      .catch(error => {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'Something went wrong.',
        })
      })
  }
}

const updateDeviceToken = async token => {
  await axiosInterceptors
    .post('/user/device', {device_token: token})
    .then(async res => {
      if (res.success === true) {
        await AsyncStorage.setItem('device_token', token)
      } else {
        ToastMessage('Device token not sent.', true)
      }
    })
    .catch(error => {
      ToastMessage('Something went wrong', true)
    })
}

export const logoutUser = navigation => {
  return async dispatch => {
    dispatch({type: 'LOGOUT_PENDING'})
    await axiosInterceptors
      .post(`${Config.apiUrl}/logout`, {
        device_token: await AsyncStorage.getItem('device_token'),
      })
      .then(res => {
        dispatch({type: 'LOGOUT_SUCCESS'})
        AsyncStorage.removeItem('isLoggedIn')
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('device_token')
        navigation.navigate('Auth')
        ToastMessage('Logged Out')
      })
      .catch(error => {
        dispatch({type: 'LOGOUT_FAILURE'})
      })
  }
}

export const forgotPassword = (email, navigation) => {
  return dispatch => {
    dispatch({type: 'FORGOT_PENDING'})
    axios
      .post(`${Config.apiUrl}/forgot/password/request`, email)
      .then(res => {
        if (res.data.success === true) {
          ToastMessage(res.data.message)
          dispatch({type: 'FORGOT_SUCCESS', payload: res.data.message})
          navigation.navigate('Otp')
        } else {
          ToastMessage(res.data.message, true)
          dispatch({type: 'FORGOT_FAILURE'})
          navigation.navigate('Login')
        }
      })
      .catch(error => {
        dispatch({
          type: 'FORGOT_FAILURE',
          payload: 'Something went wrong.',
        })
      })
  }
}

export const verifyOtp = (otp, navigation) => {
  return dispatch => {
    dispatch({type: 'OTP_PENDING'})
    axios
      .get(`${Config.apiUrl}/forgot/password/${otp}/verify`)
      .then(res => {
        if (res.data.success === true) {
          ToastMessage(res.data.message)
          dispatch({type: 'OTP_SUCCESS', payload: res.data.message})
          navigation.navigate('ResetPassword', {token: otp})
        } else {
          ToastMessage(res.data.message, true)
          dispatch({type: 'OTP_FAILURE'})
        }
      })
      .catch(error => {
        dispatch({
          type: 'OTP_FAILURE',
          payload: 'Something went wrong.',
        })
      })
  }
}

export const resetPassword = (options, navigation) => {
  return dispatch => {
    dispatch({type: 'RESET_PENDING'})
    axios
      .post(`${Config.apiUrl}/forgot/password/update`, options)
      .then(res => {
        // console.warn(res);
        if (res.data.success === true) {
          ToastMessage(res.data.message)
          dispatch({type: 'RESET_SUCCESS', payload: res.data.message})
          navigation.navigate('Login')
        } else {
          ToastMessage(res.data.message, true)
          dispatch({type: 'RESET_FAILURE'})
        }
      })
      .catch(error => {
        dispatch({
          type: 'RESET_FAILURE',
          payload: 'Something went wrong.',
        })
      })
  }
}
