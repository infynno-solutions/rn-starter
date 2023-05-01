import axiosInterceptors from '../../api'
import ToastMessage from '../Toast'

export const fetchProfile = (navigation, isRefresh) => {
  return (dispatch) => {
    isRefresh && dispatch({type: 'FETCH_PROFILE_PENDING'})

    axiosInterceptors
      .get('/user/profile')
      .then((res) => {
        if (res.success === true) {
          dispatch({type: 'FETCH_PROFILE_SUCCESS', payload: res.data})
        } else {
          dispatch({type: 'FETCH_PROFILE_FAILURE', payload: res.message})
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_PROFILE_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}

export const updateProfile = (profile) => {
  return (dispatch) => {
    dispatch({type: 'UPDATE_PROFILE_PENDING'})
    axiosInterceptors
      .post('/user/profile/update', profile)
      .then((res) => {
        if (res.success === true) {
          dispatch({type: 'UPDATE_PROFILE_SUCCESS', payload: res.data})
          ToastMessage(res.message)
        } else {
          dispatch({type: 'UPDATE_PROFILE_FAILURE', payload: res.message})
          ToastMessage(res.message, true)
        }
      })
      .catch((error) => {
        dispatch({
          type: 'UPDATE_PROFILE_FAILURE',
          payload: 'Something went wrong.',
        })
      })
  }
}
