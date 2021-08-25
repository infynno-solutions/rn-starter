import React, {useState, useEffect} from 'react'
import {ScrollView, StyleSheet, ActivityIndicator} from 'react-native'
import {fetchPolicies} from './PolicyActions'
import Accordion from '../Shared/Accordion'
import {useSelector, useDispatch} from 'react-redux'

const styles = StyleSheet.create({
  policyContainer: {
    flex: 1,
  },
})

const Policies = () => {
  const [expanded, setExpanded] = useState('')

  const {loading, policies} = useSelector(state => ({
    loading: state.PolicyReducers.loading,
    policies: state.PolicyReducers.policies,
  }))

  const dispatch = useDispatch()

  useEffect(() => dispatch(fetchPolicies()), [dispatch])

  return (
    <ScrollView style={styles.policyContainer}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {policies &&
            policies.map((policy, index) => (
              <Accordion
                key={index}
                policy={policy}
                toggleExpand={() =>
                  setExpanded(expanded === '' ? policy.id : '')
                }
                expanded={expanded}
              />
            ))}
        </>
      )}
    </ScrollView>
  )
}

Policies.navigationOptions = () => ({
  header: null,
})

export default Policies
