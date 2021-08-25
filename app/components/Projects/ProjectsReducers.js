const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  projects: null,
  tasks: null,
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
    default:
      return state
  }
}
