import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamsListType = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  ChangePassword: undefined;
  Dashboard: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamsListType,
  'Login'
>;
export type SignupScreenProps = NativeStackScreenProps<
  RootStackParamsListType,
  'Signup'
>;
export type ChangePassworScreendProps = NativeStackScreenProps<
  RootStackParamsListType,
  'ChangePassword'
>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamsListType,
  'ForgotPassword'
>;

export type DashboardScreenProps = NativeStackScreenProps<
  RootStackParamsListType,
  'Dashboard'
>;
