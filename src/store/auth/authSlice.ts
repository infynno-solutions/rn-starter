import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getInstanceId,
  getManufacturer,
  getBrand,
  getSystemVersion,
  getBaseOs,
  getUniqueId,
  getModel,
  getVersion,
} from 'react-native-device-info';
import {axiosInterceptors} from '../../api';

const initialState = {
  email: '',
  password: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  userData: {},
  userToken: '',
  redirectLogin: {
    isLoading: false,
    data: null,
    isRejected: false,
  },
};
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    {firstName, email, confirmEmail, website}: RegisterUserParams,
    thunkAPI,
  ) => {
    try {
      const response = await axiosInterceptors.post(`register`, {
        first_name: firstName,
        email_address: email,
        email_address_confirmation: confirmEmail,
        website,
      });

      return response;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password}: LoginUserParams, thunkAPI) => {
    try {
      const uuid = await getUniqueId();
      const brand = await getBrand();
      const version = await getSystemVersion();
      const model = await getModel();
      const os = Platform.OS;
      const appVersion = await getVersion();
      const device = `${brand || ''} ${model || ''}, ${os || ''} ${
        version || ''
      }`;
      const response = await axiosInterceptors.post(`/login`, {
        email,
        password,
        from_app: true,
        uuid: uuid,
        device: device,
        version: appVersion,
      });

      return response?.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    clearRedirectLoginData: state => {
      state.redirectLogin = {
        isLoading: false,
        data: null,
        isRejected: false,
      };
    },

    clearState: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      AsyncStorage.removeItem('bearer_token');
      AsyncStorage.clear();
      return state;
    },
    clearLoginStates: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    setLoginIsSuccess: state => {
      state.isSuccess = true;
      state.isFetching = false;
      return state;
    },
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, {payload}) => {
      state.userData = payload.data.user;
      state.userToken = payload?.data?.user?.bearer_token?.toString() || '';
      AsyncStorage.setItem(
        'bearer_token',
        payload?.data?.user?.bearer_token?.toString() || '',
      );
      AsyncStorage.setItem('user', JSON.stringify(payload?.data?.user));
      state.email = payload.email;
      state.password = payload.password;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    }),
      builder.addCase(loginUser.rejected, (state, {payload}: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      }),
      builder.addCase(loginUser.pending, (state, {payload}) => {
        state.isFetching = true;
      }),
      builder.addCase(registerUser.fulfilled, (state, {payload}: any) => {
        state.userData = payload.data.user;
        state.userToken = payload?.data?.user?.bearer_token?.toString() || '';
        AsyncStorage.setItem(
          'bearer_token',
          payload?.data?.user?.bearer_token?.toString() || '',
        );
        AsyncStorage.setItem('user', JSON.stringify(payload?.data?.user));
        state.email = payload.email;
        state.password = payload.password;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      }),
      builder.addCase(registerUser.rejected, (state, {payload}: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      }),
      builder.addCase(registerUser.pending, (state, {payload}) => {
        state.isFetching = true;
      });
  },
});
export const {
  clearState,
  clearRedirectLoginData,
  setLoginIsSuccess,
  resetState,
  clearLoginStates,
} = authSlice.actions;
