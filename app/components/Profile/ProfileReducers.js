const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  profile: null,
  updateProfile: {
    loading: false,
    error: '',
    data: [],
  },
}

export default function ProfileReducers(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROFILE_PENDING':
      return {...state, isLoading: true, isError: false, message: ''}
    case 'FETCH_PROFILE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        profile: action.payload,
      }
    case 'FETCH_PROFILE_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        profile: null,
      }
    case 'UPDATE_PROFILE_PENDING':
      return {...state, updateProfile: {loading: true, error: ''}}
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        updateProfile: {
          loading: false,
          error: '',
          data: action.payload,
        },
      }
    case 'UPDATE_PROFILE_FAILURE':
      return {
        ...state,
        updateProfile: {
          loading: false,
          error: action.payload,
          data: [],
        },
      }
    default:
      return state
  }
}
