import axiosInterceptors from '../../api'
import ToastMessage from '../Toast'

export const fetchLeaves = navigation => {
  return async dispatch => {
    dispatch({type: 'FETCH_LEAVES_PENDING'})

    await axiosInterceptors
      .get('/leaves')
      .then(res => {
        if (res.success === true) {
          dispatch({type: 'FETCH_LEAVES_SUCCESS', payload: res.data})
        } else {
          dispatch({type: 'FETCH_LEAVES_FAILURE', payload: res.message})
        }
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_LEAVES_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const addLeave = (leave, navigation) => {
  return dispatch => {
    dispatch({type: 'ADD_LEAVE_PENDING'})

    axiosInterceptors
      .post('/leaves', leave)
      .then(res => {
        if (res.success === true) {
          ToastMessage(res.message)
          dispatch({type: 'ADD_LEAVE_SUCCESS', payload: res.data})
          navigation.navigate('Leaves')
          dispatch(fetchLeaves())
        } else {
          ToastMessage(res.message, true)
          dispatch({type: 'ADD_LEAVE_FAILURE', payload: res.message})
        }
      })
      .catch(error => {
        dispatch({
          type: 'ADD_LEAVE_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const deleteLeave = leave_id => {
  return dispatch => {
    dispatch({type: 'DELETE_LEAVE_PENDING'})

    axiosInterceptors
      .delete(`/leaves/${leave_id}`)
      .then(res => {
        if (res.success === true) {
          ToastMessage(res.message)
          dispatch({type: 'DELETE_LEAVE_SUCCESS'})
          dispatch(fetchLeaves())
        } else {
          ToastMessage(res.message, true)
          dispatch({type: 'DELETE_LEAVE_FAILURE'})
        }
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_LEAVE_FAILURE',
          payload: 'Something went wrong.',
        })
      })
  }
}

export const getLeave = leave_id => {
  return dispatch => {
    dispatch({type: 'GET_LEAVE_PENDING'})

    axiosInterceptors
      .get(`/leaves/${leave_id}`)
      .then(res => {
        if (res.success === true) {
          dispatch({type: 'GET_LEAVE_SUCCESS', payload: res.data})
        } else {
          dispatch({type: 'GET_LEAVE_FAILURE', payload: res.message})
        }
      })
      .catch(error => {
        dispatch({
          type: 'GET_LEAVE_FAILURE',
          payload: 'Something went wrong.',
        })
      })
  }
}

export const updateLeave = (leave_id, leave, navigation) => {
  return dispatch => {
    dispatch({type: 'UPDATE_LEAVE_PENDING'})

    axiosInterceptors
      .put(`/leaves/${leave_id}`, leave)
      .then(res => {
        if (res.success === true) {
          ToastMessage(res.message)
          dispatch({type: 'UPDATE_LEAVE_SUCCESS', payload: res.data})
          dispatch(fetchLeaves())
          navigation.navigate('Leaves', {updateScreen: true})
        } else {
          ToastMessage(res.message, true)
          dispatch({type: 'UPDATE_LEAVE_FAILURE', payload: res.message})
        }
      })
      .catch(error => {
        dispatch({
          type: 'UPDATE_LEAVE_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const requestTo = navigation => {
  return dispatch => {
    dispatch({type: 'REQUEST_TO_PENDING'})
    axiosInterceptors
      .get('/leaves/admin/users/list')
      .then(res => {
        if (res.success === true) {
          dispatch({type: 'REQUEST_TO_SUCCESS', payload: res.data})
        } else {
          ToastMessage(res.message, true)
          dispatch({type: 'REQUEST_TO_FAILURE', payload: res.message})
        }
      })
      .catch(error => {
        dispatch({
          type: 'REQUEST_TO_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const updateStatus = leave => {
  return async dispatch => {
    dispatch({type: 'LEAVE_STATUS_UPDATE_PENDING'})
    await axiosInterceptors
      .post('/leaves/status', leave)
      .then(res => {
        if (res.success === true) {
          dispatch({type: 'LEAVE_STATUS_UPDATE_SUCCESS'})
          dispatch(fetchLeaves())
          ToastMessage(res.message)
        } else {
          dispatch({type: 'LEAVE_STATUS_UPDATE_FAILURE'})
          ToastMessage(res.message, true)
        }
      })
      .catch(error => {
        dispatch({
          type: 'LEAVE_STATUS_UPDATE_FAILURE',
          payload: 'Something went wrong.',
        })
      })
  }
}
