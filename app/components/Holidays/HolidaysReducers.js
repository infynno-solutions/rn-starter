const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  holidays: null,
}

export default function HolidaysReducers(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_HOLIDAYS_PENDING':
      return {...state, isLoading: true, isError: false, message: ''}
    case 'FETCH_HOLIDAYS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        holidays: action.payload,
      }
    case 'FETCH_HOLIDAYS_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLoggedIn: false,
        message: action.payload,
        holidays: null,
      }
    default:
      return state
  }
}
