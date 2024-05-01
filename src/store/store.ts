import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { authSlice } from './auth/authSlice';


const reducers = combineReducers({
  auth: authSlice.reducer,
});

const rootReducer = (state:any, action:{ type: string, payload: any }) => {
  if (action.type === 'auth/clearState') {
    AsyncStorage.removeItem('persist:root');
    state = {};
  }
  return reducers(state, action);
};
const persistConfig = {
  key: 'root',
  timeout: 1000,
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
