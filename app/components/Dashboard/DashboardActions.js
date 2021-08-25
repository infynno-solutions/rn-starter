import axiosInterceptors from '../../api'
import ToastMessage from '../Toast'

export const fetchStats = navigation => {
  return dispatch => {
    dispatch({type: 'DASHBOARD_STATS_PENDING'})

    axiosInterceptors
      .get('/dashboard')
      .then(res => {
        if (res.success === true) {
          dispatch({type: 'DASHBOARD_STATS_SUCCESS', data: res.data})
        } else {
          dispatch({type: 'DASHBOARD_STATS_FAILURE', message: res.message})
        }
      })
      .catch(error => {
        dispatch({
          type: 'DASHBOARD_STATS_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const fetchPunchLogs = navigation => {
  return async dispatch => {
    dispatch({type: 'FETCH_PUNCHLOGS_PENDING'})

    await axiosInterceptors
      .get('/punchlog')
      .then(res => {
        if (res.success === true) {
          dispatch({type: 'FETCH_PUNCHLOGS_SUCCESS', data: res.data})
        } else {
          dispatch({type: 'FETCH_PUNCHLOGS_FAILURE', message: res.message})
          ToastMessage(res.message, true)
        }
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_PUNCHLOGS_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const createPunchLog = navigation => {
  return async dispatch => {
    dispatch({type: 'CREATE_PUNCHLOGS_PENDING'})

    await axiosInterceptors
      .post('/punchlog')
      .then(res => {
        if (res.success === true) {
          dispatch({type: 'CREATE_PUNCHLOGS_SUCCESS', data: res.data})
          ToastMessage(res.message)
          dispatch(fetchPunchLogs(navigation))
        } else {
          dispatch({type: 'CREATE_PUNCHLOGS_FAILURE', message: res.message})
          ToastMessage(res.message, true)
        }
      })
      .catch(error => {
        dispatch({
          type: 'CREATE_PUNCHLOGS_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}
