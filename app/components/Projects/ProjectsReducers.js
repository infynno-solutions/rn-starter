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
  projectTasks: false,
  requestUser: null,
  punchLogList: {loading: false, error: false, message: '', data: null},
  extraLogList: {loading: false, error: false, message: '', data: null},
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
        worklogsTaskLoading: false,
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
    case 'FETCH_PROJECTS_TASKS_PENDING':
      return {...state, isError: false, message: '', worklogsTaskLoading: true}
    case 'FETCH_PROJECTS_TASKS_SUCCESS':
      return {
        ...state,
        isError: false,
        worklogsTaskLoading: false,
        projectTasks: [
          {id: 0, title: 'Please select an option'},
          ...action.payload,
        ],
      }
    case 'FETCH_PROJECTS_TASKS_FAILURE':
      return {
        ...state,
        isError: true,
        isLoggedIn: false,
        message: action.payload,
        projectTasks: null,
      }
    case 'ADD_EXTRA_PENDING':
      return {
        ...state,
        isStoreLoading: true,
        isError: false,
        message: '',
      }
    case 'ADD_EXTRA_SUCCESS':
      return {
        ...state,
        isStoreLoading: false,
        isError: false,
        message: '',
      }
    case 'ADD_EXTRA_FAILURE':
      return {
        ...state,
        isStoreLoading: false,
        isError: true,
        message: action?.payload,
      }
    case 'FETCH_REQUEST_USER_PENDING':
      return {
        ...state,
        isStoreLoading: false,
        isError: true,
        message: action?.payload,
      }
    case 'FETCH_REQUEST_USER_FAILURE':
      return {...state, isError: false, message: '', worklogsTaskLoading: false}
    case 'FETCH_REQUEST_USER_SUCCESS':
      return {
        ...state,
        isError: false,
        worklogsTaskLoading: false,
        requestUser: [
          {id: 0, full_name: 'Please select an option'},
          ...action.payload,
        ],
      }
    case 'GET_PUNCH_LOG_LIST_PENDING':
      return {
        ...state,
        punchLogList: {loading: true, error: false, message: '', data: null},
      }
    case 'GET_PUNCH_LOG_LIST':
      return {
        ...state,
        punchLogList: {
          loading: false,
          error: false,
          message: action.message,
          data: action.payload,
        },
      }
    case 'GET_PUNCH_LOG_ERROR':
      return {
        ...state,
        punchLogList: {
          loading: false,
          error: true,
          message: action.message,
          data: null,
        },
      }
    case 'GET_EXTRA_LOGS_PENDING':
      return {
        ...state,
        extraLogList: {loading: true, error: false, message: '', data: null},
      }
    case 'GET_EXTRA_LOGS_LIST':
      return {
        ...state,
        extraLogList: {
          loading: false,
          error: false,
          message: action.message,
          data: action.payload,
        },
      }
    case 'GET_EXTRA_LOG_ERROR':
      return {
        ...state,
        extraLogList: {
          loading: false,
          error: true,
          message: action.message,
          data: null,
        },
      }
    default:
      return state
  }
}
