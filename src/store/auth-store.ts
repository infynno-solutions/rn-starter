import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-community/async-storage';
import {
  signInUsingEmailPassword,
  signUpUsingEmailPassword,
} from '../services/firebase';

interface AuthSlice {
  email: string;
  password: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  userData: {};
  userToken: string;
  registerUser: (props: RegisterUserParams) => void;
  loginUser: (props: LoginUserParams) => void;
  clearAuth: () => void;
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
};

export const useAuthStore = create<AuthSlice>()(
  persist(
    set => ({
      ...initialState,
      setLoginIsSuccess: () =>
        set(state => ({...state, isSuccess: true, isFetching: false})),
      clearAuth: () => set(state => initialState),
      registerUser: async ({
        email,
        password,
        onSuccess,
      }: RegisterUserParams) => {
        set(state => ({...state, isFetching: true}));
        try {
          await signUpUsingEmailPassword({email, password});
          onSuccess && onSuccess();
          set(state => ({...state, isFetching: false}));
        } catch (e: any) {
          set(state => ({...state, isFetching: false}));
        }
      },
      loginUser: async ({email, password}: LoginUserParams) => {
        set(state => ({...state, isFetching: true}));
        try {
          const response = await signInUsingEmailPassword({email, password});
          set(state => ({...state, isFetching: false, userData: response}));
        } catch (e: any) {
          set(state => ({...state, isFetching: false}));
        }
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
