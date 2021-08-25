const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  interviews: null,
  updateFeedback: {
    loading: false,
    data: [],
    error: '',
  },
}

export default function InterviewReducers(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_INTERVIEWS_PENDING':
      return {...state, isLoading: true, isError: false, message: ''}
    case 'FETCH_INTERVIEWS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        interviews: action.payload,
      }
    case 'FETCH_INTERVIEWS_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLoggedIn: false,
        message: action.payload,
        interviews: null,
      }
    case 'UPDATE_FEEDBACK_PENDING':
      return {
        ...state,
        updateFeedback: {
          loading: true,
          data: [],
          error: '',
        },
      }
    case 'UPDATE_FEEDBACK_SUCCESS':
      return {
        ...state,
        updateFeedback: {
          loading: false,
          data: action.payload,
          error: '',
        },
      }
    case 'UPDATE_FEEDBACK_FAILURE':
      return {
        ...state,
        updateFeedback: {
          loading: false,
          data: [],
          error: action.payload,
        },
      }
    default:
      return state
  }
}
