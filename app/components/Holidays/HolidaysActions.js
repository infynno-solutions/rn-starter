import axiosInterceptors from '../../api'

export const fetchHolidays = navigation => {
  return dispatch => {
    dispatch({type: 'FETCH_HOLIDAYS_PENDING'})

    axiosInterceptors
      .get('/holidays')
      .then(res => {
        if (res.success === true) {
          dispatch({type: 'FETCH_HOLIDAYS_SUCCESS', payload: res.data})
        } else {
          dispatch({type: 'FETCH_HOLIDAYS_FAILURE', payload: res.message})
        }
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_HOLIDAYS_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}
