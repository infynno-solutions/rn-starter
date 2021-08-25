const initialState = {
  isInprogress: false,
  isError: false,
  message: '',
  isLoggedIn: false,
  user: null,
  forgotPassword: {
    loading: false,
    error: '',
    data: null,
  },
  otpVerification: {
    loading: false,
    error: '',
    data: null,
  },
  resetPassword: {
    loading: false,
    error: '',
    data: null,
  },
}

export default function AuthReducers(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_INPROGRESS':
      return {...state, isInprogress: true, isError: false, message: ''}
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isInprogress: false,
        isError: false,
        isLoggedIn: true,
        user: action.payload,
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isInprogress: false,
        isError: true,
        isLoggedIn: false,
        message: action.payload,
        user: null,
      }
    case 'LOGOUT_INPROGRESS':
      return {...state, isInprogress: true, isError: false, message: ''}
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isInprogress: false,
        isError: false,
        isLoggedIn: false,
        user: null,
      }
    case 'LOGOUT_FAILURE':
      return {
        ...state,
        isInprogress: false,
        isError: true,
        isLoggedIn: true,
        message: action.payload,
      }
    case 'FORGOT_PENDING':
      return {
        ...state,
        forgotPassword: {
          loading: true,
          data: null,
          error: '',
        },
      }
    case 'FORGOT_SUCCESS':
      return {
        ...state,
        forgotPassword: {
          loading: false,
          data: action.payload,
          error: '',
        },
      }
    case 'FORGOT_FAILURE':
      return {
        ...state,
        forgotPassword: {
          loading: false,
          data: null,
          error: action.message,
        },
      }
    case 'OTP_PENDING':
      return {
        ...state,
        otpVerification: {
          loading: true,
          data: null,
          error: '',
        },
      }
    case 'OTP_SUCCESS':
      return {
        ...state,
        otpVerification: {
          loading: false,
          data: action.payload,
          error: '',
        },
      }
    case 'OTP_FAILURE':
      return {
        ...state,
        otpVerification: {
          loading: false,
          data: null,
          error: action.message,
        },
      }
    case 'RESET_PENDING':
      return {
        ...state,
        resetPassword: {
          loading: true,
          data: null,
          error: '',
        },
      }
    case 'RESET_SUCCESS':
      return {
        ...state,
        resetPassword: {
          loading: false,
          data: action.payload,
          error: '',
        },
      }
    case 'RESET_FAILURE':
      return {
        ...state,
        resetPassword: {
          loading: false,
          data: null,
          error: action.message,
        },
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isInprogress: false,
        isError: false,
        message: '',
        isLoggedIn: false,
        user: null,
      }
    default:
      return state
  }
}
