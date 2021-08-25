const initialState = {
  loading: false,
  error: false,
  message: '',
  data: null,
  punchlogs: {loading: false, error: false, message: '', data: null},
  createPunchLog: {loading: false, error: false, message: '', data: null},
}

export default function DashboardReducers(state = initialState, action) {
  switch (action.type) {
    case 'DASHBOARD_STATS_PENDING':
      return {...state, loading: true, error: false, message: '', data: null}
    case 'DASHBOARD_STATS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        message: action.message,
        data: action.data,
      }
    case 'DASHBOARD_STATS_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
        data: null,
      }
    case 'FETCH_PUNCHLOGS_PENDING':
      return {
        ...state,
        punchlogs: {loading: true, error: false, message: '', data: null},
      }
    case 'FETCH_PUNCHLOGS_SUCCESS':
      return {
        ...state,
        punchlogs: {
          loading: false,
          error: false,
          message: action.message,
          data: action.data,
        },
      }
    case 'FETCH_PUNCHLOGS_FAILURE':
      return {
        ...state,
        punchlogs: {
          loading: false,
          error: true,
          message: action.message,
          data: null,
        },
      }
    case 'CREATE_PUNCHLOGS_PENDING':
      return {
        ...state,
        createPunchLog: {loading: true, error: false, message: '', data: null},
      }
    case 'CREATE_PUNCHLOGS_SUCCESS':
      return {
        ...state,
        createPunchLog: {
          loading: false,
          error: false,
          message: action.message,
          data: action.data,
        },
      }
    case 'CREATE_PUNCHLOGS_FAILURE':
      return {
        ...state,
        createPunchLog: {
          loading: false,
          error: true,
          message: action.message,
          data: null,
        },
      }
    default:
      return {...state}
  }
}
