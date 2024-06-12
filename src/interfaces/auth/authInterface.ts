interface RedirectLoginState {
  isLoading: boolean;
  data: any;
  isRejected: boolean;
}

interface AuthState {
  email: string;
  password: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  userData: any;
  userToken: string;
  redirectLogin: {[key: string]: RedirectLoginState};
}

interface RegisterUserParams {
  email: string;
  password: string;
  onSuccess?: () => void;
}

interface LoginUserParams {
  email: string;
  password: string;
}
