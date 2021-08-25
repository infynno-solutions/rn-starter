const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  tasks: null,
  activeTask: {
    uploadingTimer: false,
    start: null,
    stop: null,
    difference: null,
    task: null,
    project: null,
    taskName: '',
    projectName: '',
    note: '',
  },
  // fetchingTimer: true,
  // startedAt: null,
  // stoppedAt: null,
  // difference: null,
  // startedTask: null,
}

export default function TasksReducers(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TASKS_PENDING':
      return {...state, isLoading: true, isError: false, message: ''}
    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        tasks: action.payload,
      }
    case 'FETCH_TASKS_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        tasks: null,
      }
    case 'TIMER_START':
      return {
        ...state,
        activeTask: {
          start: action.start,
          task: action.task,
          project: action.project,
          taskName: action.taskName,
          projectName: action.projectName,
        },
      }
    case 'TIMER_END':
      return {
        ...state,
        activeTask: {
          uploadingTimer: true,
          start: action.start,
          task: action.task,
          project: action.project,
          stop: action.end,
          difference: action.difference,
          taskName: action.taskName,
          projectName: action.projectName,
          note: action.note,
        },
      }
    case 'TIMER_UPLOADED':
      return {
        ...state,
        activeTask: {
          uploadingTimer: false,
          start: null,
          end: null,
          difference: null,
          task: null,
          project: null,
          taskName: '',
          projectName: '',
          note: '',
        },
      }
    default:
      return state
  }
}
