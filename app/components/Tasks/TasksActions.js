import axiosInterceptors from '../../api'
import ToastMessage from '../Toast'

export const fetchTasks = (project_id, navigation) => {
  return dispatch => {
    dispatch({type: 'FETCH_TASKS_PENDING'})

    axiosInterceptors
      .get(`/projects/tasks/${project_id}/list`)
      .then(res => {
        if (res.success === true) {
          dispatch({type: 'FETCH_TASKS_SUCCESS', payload: res.data})
        } else {
          dispatch({type: 'FETCH_TASKS_FAILURE', payload: res.message})
        }
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_TASKS_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const startTimer = (
  taskId,
  projectId,
  startTime,
  startTimeOriginal,
  taskName,
  projectName
) => {
  return dispatch => {
    dispatch({
      type: 'TIMER_START',
      start: startTimeOriginal,
      task: taskId,
      project: projectId,
      taskName: taskName,
      projectName: projectName,
    })

    ToastMessage('Timer Started.')
  }
}

export const endTimer = (
  taskId,
  projectId,
  startTime,
  startTimeOriginal,
  endTime,
  endTimeOriginal,
  diff,
  taskName,
  projectName,
  note
) => {
  const data = {
    task_id: taskId,
    local_start_time: startTimeOriginal,
    local_end_time: endTimeOriginal,
    tracked_hour: diff,
    note: note,
  }

  return dispatch => {
    axiosInterceptors
      .post('/projects/tasks/tracktime', data)
      .then(res => {
        if (res.success === true) {
          dispatch({
            type: 'TIMER_END',
            end: endTime,
            difference: diff,
            start: startTime,
            task: taskId,
            project: projectId,
            taskName: taskName,
            projectName: projectName,
            note: note,
          })
          dispatch({type: 'TIMER_UPLOADED'})
          ToastMessage('Timer Ended.')
        } else {
          ToastMessage(res.message, true)
        }
      })
      .catch(error => {
        console.warn(error.response)
      })
  }
}

export const deleteTimer = () => {
  return dispatch => {
    dispatch({type: 'TIMER_UPLOADED'})
    ToastMessage('Timer Deleted', true)
  }
}
