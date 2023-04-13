import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from '../constants/constants';

const axiosInterceptors = axios.create({
  baseURL: Constants.base_url,
  timeout: 45000,
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer',
  },
});

axiosInterceptors.interceptors.request.use(async function (config) {
  axios.defaults.timeout = 45000;

  const token = await AsyncStorage.getItem('bearer_token');
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosInterceptors.interceptors.response.use(
  function onSuccess(response) {
    return response.data;
  },
  function onError(error) {
    if (error?.response?.status !== 403 && error?.response?.status !== 404) {
      Alert.alert('Error', error?.response?.data?.message);
    }
    if (error.response.status === 422) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export {axiosInterceptors};
