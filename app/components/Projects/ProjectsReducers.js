const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  projects: null,
  tasks: null,
  worklogs: null,
  worklogsProject: null,
  isStoreLoading: false,
  worklogsTaskLoading: false,
}

export default function ProjectsReducers(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROJECTS_PENDING':
      return {...state, isLoading: true, isError: false, message: ''}
    case 'FETCH_PROJECTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        projects: action.payload,
      }
    case 'FETCH_PROJECTS_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLoggedIn: false,
        message: action.payload,
        projects: null,
      }
    case 'FETCH_WORKLOGS_PENDING':
      return {...state, isLoading: true, isError: false, message: ''}
    case 'FETCH_WORKLOGS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        worklogs: action.payload,
      }
    case 'FETCH_WORKLOGS_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLoggedIn: false,
        message: action.payload,
        worklogs: null,
      }

    case 'FETCH_WORKLOGS_PROJECTS_PENDING':
      return {...state, isError: false, message: '', worklogsTaskLoading: true}
    case 'FETCH_WORKLOGS_PROJECTS_SUCCESS':
      return {
        ...state,
        isError: false,
        worklogsTaskLoading: false,
        worklogsProject: action.payload,
      }
    case 'FETCH_WORKLOGS_PROJECTS_FAILURE':
      return {
        ...state,
        isError: true,
        isLoggedIn: false,
        message: action.payload,
        worklogsProject: null,
      }

    case 'WORKLOG_STORE_PENDING':
      return {
        ...state,
        isStoreLoading: true,
        isError: false,
        message: '',
      }
    case 'WORKLOG_STORE_SUCCESS':
      return {
        ...state,
        isStoreLoading: false,
        isError: false,
        message: '',
      }
    case 'WORKLOG_STORE_FAILURE':
      return {
        ...state,
        isStoreLoading: false,
        isError: true,
        message: action?.payload,
      }

    default:
      return state
  }
}
