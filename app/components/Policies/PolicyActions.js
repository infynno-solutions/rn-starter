import axiosInterceptors from '../../api'

export const fetchPolicies = navigation => {
  return dispatch => {
    dispatch({type: 'FETCH_POLICIES_PENDING'})

    axiosInterceptors
      .get('/policies/list')
      .then(res => {
        if (res.success === true) {
          dispatch({
            type: 'FETCH_POLICIES_SUCCESS',
            policies: res.data.policies,
          })
        } else {
          dispatch({type: 'FETCH_POLICIES_FAILURE'})
        }
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_POLICIES_FAILURE',
          payload: 'Something went wrong.',
        })
        if (error.status && error.response.status === 401) {
          navigation.navigate('Auth')
        }
      })
  }
}
