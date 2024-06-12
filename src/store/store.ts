import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-community/async-storage';

interface AuthSlice {
  email: string;
  password: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  userData: {};
  userToken: string;
  redirectLogin: {
    isLoading: boolean;
    data: null;
    isRejected: boolean;
  };
}

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

export const useAuthStore = create<AuthSlice>()(
  persist(
    set => ({
      ...initialState,
      clearRedirectLoginData: () =>
        set(state => ({
          ...state,
          redirectLogin: {isLoading: false, data: null, isRejected: false},
        })),
      clearState: () =>
        set(state => ({
          ...state,
          isError: false,
          isSuccess: false,
          isFetching: false,
        })),
      clearLoginStates: () =>
        set(state => ({
          ...state,
          isError: false,
          isSuccess: false,
          isFetching: false,
        })),
      setLoginIsSuccess: () =>
        set(state => ({...state, isSuccess: true, isFetching: false})),
      resetState: () => set(state => initialState),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
