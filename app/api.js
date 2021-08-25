import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ToastMessage from './components/Toast'
import {Config} from './common'

const axiosInterceptors = axios.create({
  baseURL: Config.apiUrl,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer',
  },
})

axiosInterceptors.interceptors.request.use(async function(config) {
  const token = await AsyncStorage.getItem('token')
  config.headers.Authorization = 'Bearer '.concat(token)
  return config
})

axiosInterceptors.interceptors.response.use(
  function onSuccess(response) {
    return response.data
  },
  function onError(error) {
    if (!error.status || error.code === 'ECONNABORTED') {
      ToastMessage(
        'Request timeout. Please check your internet connection.',
        true
      )
    } else if (error.response.status === 401 || error.status === 401) {
      AsyncStorage.removeItem('isLoggedIn')
      AsyncStorage.removeItem('token')
      ToastMessage('Your session has been expired.', true)
    } else {
      ToastMessage('Something went wrong!', true)
    }

    return Promise.reject(error)
  }
)

export default axiosInterceptors
