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
  console.log(payload)
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
