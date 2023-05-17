import axiosInterceptors from '../../api'
import ToastMessage from '../Toast'

export const fetchProjects = (navigation) => {
  return (dispatch) => {
    dispatch({type: 'FETCH_PROJECTS_PENDING'})

    axiosInterceptors
      .get('/projects')
      .then((res) => {
        if (res.success === true) {
          dispatch({type: 'FETCH_PROJECTS_SUCCESS', payload: res.data})
        } else {
          dispatch({type: 'FETCH_PROJECTS_FAILURE', payload: res.message})
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_PROJECTS_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const fetchWorkLogs = (navigation) => {
  return (dispatch) => {
    dispatch({type: 'FETCH_WORKLOGS_PENDING'})
    return new Promise((resolve, reject) => {
      axiosInterceptors
        .get('/worklog')
        .then((res) => {
          if (res.success === true) {
            dispatch({type: 'FETCH_WORKLOGS_SUCCESS', payload: res.data})
            resolve(res.data)
          } else {
            dispatch({type: 'FETCH_WORKLOGS_FAILURE', payload: res.message})
            reject(res.message)
          }
        })
        .catch((error) => {
          dispatch({
            type: 'FETCH_WORKLOGS_FAILURE',
            payload: 'Something went wrong.',
          })
          if (error.status && error.response.status === 401) {
            navigation.navigate('Auth')
          }
        })
    })
  }
}

export const fetchWorkLogProjects = (projectId, navigation) => {
  return (dispatch) => {
    dispatch({type: 'FETCH_WORKLOGS_PROJECTS_PENDING'})

    axiosInterceptors
      .get(`/worklog/project/${projectId}/task`)
      .then((res) => {
        if (res.success === true) {
          dispatch({type: 'FETCH_WORKLOGS_PROJECTS_SUCCESS', payload: res.data})
        } else {
          dispatch({
            type: 'FETCH_WORKLOGS_PROJECTS_FAILURE',
            payload: res.message,
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_WORKLOGS_PROJECTS_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const addWorklogStore = (payload) => {
  return (dispatch) => {
    dispatch({type: 'WORKLOG_STORE_PENDING'})
    return new Promise((resolve, reject) => {
      axiosInterceptors
        .post('/worklog/store', payload)
        .then((res) => {
          if (res.success === true) {
            dispatch({type: 'WORKLOG_STORE_SUCCESS', payload: res.data})
            resolve(res.data)
            ToastMessage(res.message)
          } else {
            dispatch({type: 'WORKLOG_STORE_FAILURE', payload: res.message})
            reject(res.message)
            ToastMessage(res.message, true)
          }
        })
        .catch((error) => {
          dispatch({
            type: 'WORKLOG_STORE_FAILURE',
            payload: 'Something went wrong.',
          })
        })
    })
  }
}

export const extraRequestUser = (navigation) => {
  return (dispatch) => {
    dispatch({type: 'FETCH_REQUEST_USER_PENDING'})

    axiosInterceptors
      .get(`/worklog/extra/request/user`)
      .then((res) => {
        if (res.success === true) {
          dispatch({
            type: 'FETCH_REQUEST_USER_SUCCESS',
            payload: res.data?.adminUser,
          })
        } else {
          dispatch({
            type: 'FETCH_REQUEST_USER_FAILURE',
            payload: res.message,
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_REQUEST_USER_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const fetchProjectsTasks = (projectId, navigation) => {
  return (dispatch) => {
    dispatch({type: 'FETCH_PROJECTS_TASKS_PENDING'})

    axiosInterceptors
      .get(`/worklog/project/tasks`, {
        params: {
          project_id: projectId,
        },
      })
      .then((res) => {
        if (res.success === true) {
          dispatch({
            type: 'FETCH_PROJECTS_TASKS_SUCCESS',
            payload: res.data.projectTask,
          })
        } else {
          dispatch({
            type: 'FETCH_PROJECTS_TASKS_FAILURE',
            payload: res.message,
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_PROJECTS_TASKS_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const addExtraLog = (payload) => {
  return (dispatch) => {
    dispatch({type: 'ADD_EXTRA_PENDING'})
    return new Promise((resolve, reject) => {
      axiosInterceptors
        .post('/worklog/extra/store', payload)
        .then((res) => {
          if (res.success === true) {
            dispatch({type: 'ADD_EXTRA_SUCCESS', payload: res.data})
            resolve(res.data)
            ToastMessage(res.message)
          } else {
            dispatch({type: 'ADD_EXTRA_FAILURE', payload: res.message})
            reject(res.message)
            ToastMessage(res.message, true)
          }
        })
        .catch((error) => {
          dispatch({
            type: 'ADD_EXTRA_FAILURE',
            payload: 'Something went wrong.',
          })
        })
    })
  }
}

export const getPunchLogList = (navigation, params) => {
  return (dispatch) => {
    dispatch({type: 'GET_PUNCH_LOG_LIST_PENDING'})
    return new Promise((resolve, reject) => {
      axiosInterceptors
        .get('/punchlog', {
          params: params,
        })
        .then((res) => {
          if (res.success === true) {
            dispatch({type: 'GET_PUNCH_LOG_LIST', payload: res.data})
            resolve(res.data)
          } else {
            dispatch({type: 'GET_PUNCH_LOG_ERROR', payload: res.message})
            reject(res.message)
          }
        })
        .catch((error) => {
          dispatch({
            type: 'GET_PUNCH_LOG_ERROR',
            payload: 'Something went',
          })
          if (error.status && error.response.status === 401) {
            navigation.navigate('Auth')
          }
        })
    })
  }
}

export const getExtraLogsList = (navigation, params) => {
  return (dispatch) => {
    dispatch({type: 'GET_EXTRA_LOGS_PENDING'})
    return new Promise((resolve, reject) => {
      axiosInterceptors
        .get('/worklog/extra', {
          params: params,
        })

        .then((res) => {
          if (res.success === true) {
            dispatch({type: 'GET_EXTRA_LOGS_LIST', payload: res.data})
            resolve(res.data)
          } else {
            dispatch({type: 'GET_EXTRA_LOG_ERROR', payload: res.message})
            reject(res.message)
          }
        })
        .catch((error) => {
          dispatch({
            type: 'GET_EXTRA_LOG_ERROR',
            payload: 'Something went',
          })
          if (error.status && error.response.status === 401) {
            navigation.navigate('Auth')
          }
        })
    })
  }
}
