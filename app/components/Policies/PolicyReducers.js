const initialState = {
  loading: false,
  error: false,
  message: null,
  policies: null,
}

export default function PolicyReducers(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_POLICIES_PENDING':
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
        policies: null,
      }
    case 'FETCH_POLICIES_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        message: null,
        policies: action.policies,
      }
    case 'FETCH_POLICIES_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
        policies: null,
      }
    default:
      return {...state}
  }
}
