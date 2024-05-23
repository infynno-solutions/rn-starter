import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import { signInUsingEmailPassword, signUpUsingEmailPassword } from '../../services/firebase';

const initialState = {
  email: '',
  password: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  userData: {},
  userToken: '',
 
};
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { email, password, onSuccess}: RegisterUserParams,
    thunkAPI,
  ) => {
    try {
        
      const response = await signUpUsingEmailPassword({email,password})
      onSuccess&&onSuccess()
      return response;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password}: LoginUserParams, thunkAPI) => {
    try {
      
      const response = await signInUsingEmailPassword({email,password})
            return response;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoginIsSuccess: state => {
      
    },
    clearAuth: () => {
      AsyncStorage.clear();
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, {payload}) => {
      state.isFetching=false
      state.userData=payload
    }),
      builder.addCase(loginUser.rejected, (state, {payload}: any) => {
        state.isFetching=false

      }),
      builder.addCase(loginUser.pending, (state, {payload}) => {
      state.isFetching=true
      }),
      builder.addCase(registerUser.fulfilled, (state, {payload}: any) => {
        state.isFetching=false
      }),
      builder.addCase(registerUser.rejected, (state, {payload}: any) => {
        state.isFetching=false

      }),
      builder.addCase(registerUser.pending, (state, {payload}) => {
        state.isFetching=true

      });
  },
});
export const {
  clearAuth,
  setLoginIsSuccess,
} = authSlice.actions;
