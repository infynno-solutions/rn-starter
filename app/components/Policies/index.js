/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react'
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  View,
  Dimensions,
} from 'react-native'
import {fetchPolicies} from './PolicyActions'
import Accordion from '../Shared/Accordion'
import {useSelector, useDispatch} from 'react-redux'
import CustomHeader from '../CustomHeader'

const styles = StyleSheet.create({
  policyContainer: {
    flex: 1,
  },
})

const Policies = (props) => {
  const {width} = useWindowDimensions()

  const [expanded, setExpanded] = useState('')

  const {loading, policies} = useSelector((state) => ({
    loading: state.PolicyReducers.loading,
    policies: state.PolicyReducers.policies,
  }))

  const dispatch = useDispatch()

  useEffect(() => dispatch(fetchPolicies()), [dispatch])

  return (
    <ScrollView style={styles.policyContainer}>
      <CustomHeader name="Policies" navigation={props.navigation} />

      {loading ? (
        <View
          style={{
            height: Dimensions.get('window').height,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
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
                width={width}
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
