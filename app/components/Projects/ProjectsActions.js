import axiosInterceptors from '../../api'

export const fetchProjects = navigation => {
  return dispatch => {
    dispatch({type: 'FETCH_PROJECTS_PENDING'})

    axiosInterceptors
      .get('/projects')
      .then(res => {
        if (res.success === true) {
          dispatch({type: 'FETCH_PROJECTS_SUCCESS', payload: res.data})
        } else {
          dispatch({type: 'FETCH_PROJECTS_FAILURE', payload: res.message})
        }
      })
      .catch(error => {
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
