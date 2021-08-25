const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  leaves: null,
  addLeaves: {
    loading: false,
    data: [],
    error: '',
  },
  getLeave: {
    loading: false,
    data: [],
    error: '',
  },
  updateLeave: {
    loading: false,
    data: [],
    error: '',
  },
  requestTo: {
    loading: false,
    data: null,
    error: '',
  },
  updateStatus: {
    loading: false,
    data: null,
    error: '',
  },
}

export default function LeavesReducers(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_LEAVES_PENDING':
      return {...state, isLoading: true, isError: false, message: ''}
    case 'FETCH_LEAVES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        leaves: action.payload,
      }
    case 'FETCH_LEAVES_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLoggedIn: false,
        message: action.payload,
        leaves: null,
      }
    case 'ADD_LEAVE_PENDING':
      return {
        ...state,
        addLeaves: {
          loading: true,
          data: [],
          error: '',
        },
      }
    case 'ADD_LEAVE_SUCCESS':
      return {
        ...state,
        addLeaves: {
          loading: false,
          data: action.payload,
          error: '',
        },
      }
    case 'ADD_LEAVE_FAILURE':
      return {
        ...state,
        addLeaves: {
          loading: false,
          data: [],
          error: action.payload,
        },
      }
    case 'GET_LEAVE_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
        getLeave: {
          loading: true,
          error: '',
          data: [],
        },
      }
    case 'GET_LEAVE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        getLeave: {
          loading: false,
          error: '',
          data: action.payload,
        },
      }
    case 'GET_LEAVE_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        getLeave: {
          loading: false,
          error: action.message,
          data: [],
        },
      }
    case 'DELETE_LEAVE_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      }
    case 'DELETE_LEAVE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
      }
    case 'DELETE_LEAVE_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      }
    case 'UPDATE_LEAVE_PENDING':
      return {
        ...state,
        updateLeave: {
          loading: true,
          data: [],
          error: '',
        },
      }
    case 'UPDATE_LEAVE_SUCCESS':
      return {
        ...state,
        updateLeave: {
          loading: false,
          data: action.payload,
          error: '',
        },
      }
    case 'UPDATE_LEAVE_FAILURE':
      return {
        ...state,
        updateLeave: {
          loading: false,
          data: [],
          error: action.payload,
        },
      }
    case 'REQUEST_TO_PENDING':
      return {
        ...state,
        requestTo: {
          loading: true,
          data: [],
          error: '',
        },
      }
    case 'REQUEST_TO_SUCCESS':
      return {
        ...state,
        requestTo: {
          loading: false,
          data: action.payload,
          error: '',
        },
      }
    case 'REQUEST_TO_FAILURE':
      return {
        ...state,
        requestTo: {
          loading: false,
          data: [],
          error: action.payload,
        },
      }
    case 'LEAVE_STATUS_UPDATE_PENDING':
      return {
        ...state,
        updateStatus: {
          loading: true,
          data: [],
          error: '',
        },
      }
    case 'LEAVE_STATUS_UPDATE_SUCCESS':
      return {
        ...state,
        updateStatus: {
          loading: false,
          data: action.payload,
          error: '',
        },
      }
    case 'LEAVE_STATUS_UPDATE_FAILURE':
      return {
        ...state,
        updateStatus: {
          loading: false,
          data: [],
          error: action.payload,
        },
      }
    default:
      return state
  }
}
