import axiosInterceptors from '../../api'
import ToastMessage from '../Toast'

export const fetchInterviews = navigation => {
  return dispatch => {
    dispatch({type: 'FETCH_INTERVIEWS_PENDING'})

    axiosInterceptors
      .get('/interviews')
      .then(res => {
        if (res.success === true) {
          dispatch({type: 'FETCH_INTERVIEWS_SUCCESS', payload: res.data})
        } else {
          dispatch({type: 'FETCH_INTERVIEWS_FAILURE', payload: res.message})
        }
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_INTERVIEWS_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const updateFeedback = (data, navigation) => {
  return dispatch => {
    dispatch({type: 'UPDATE_FEEDBACK_PENDING'})

    axiosInterceptors
      .post(`/interviews/status`, data)
      .then(res => {
        if (res.success === true) {
          ToastMessage(res.message)
          dispatch({type: 'UPDATE_FEEDBACK_SUCCESS', payload: res.data})
          dispatch(fetchInterviews())
          navigation.navigate('Interviews', {updateScreen: true})
        } else {
          ToastMessage(res.message, true)
          dispatch({type: 'UPDATE_FEEDBACK_FAILURE', payload: res.message})
        }
      })
      .catch(error => {
        dispatch({
          type: 'UPDATE_FEEDBACK_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}
