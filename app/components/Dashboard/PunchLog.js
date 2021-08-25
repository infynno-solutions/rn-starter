import React, {useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Config} from '../../common'
import {useSelector, useDispatch} from 'react-redux'
import {fetchPunchLogs, createPunchLog} from './DashboardActions'

const styles = StyleSheet.create({
  punchLogWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    shadowOffset: {width: 2, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 0.5,
  },
  iconContainer: {
    marginRight: 20,
    borderRadius: 50,
    padding: 15,
    backgroundColor: '#F7A248',
  },
  icon: {
    color: 'rgba(0,0,0,0.50)',
  },
  info: {flex: 1},
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    color: Config.textColor,
    fontSize: 16,
  },
  textStrong: {
    fontSize: 16,
  },
  startButton: {
    backgroundColor: Config.successColor,
    borderRadius: 50,
    padding: 15,
  },
  stopButton: {
    backgroundColor: Config.errorColor,
    borderRadius: 50,
    padding: 15,
  },
})

const PunchLog = ({navigation}) => {
  const {punchlogs} = useSelector(state => ({
    punchlogs: state.DashboardReducers.punchlogs,
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPunchLogs(navigation))
  }, [dispatch, navigation])

  let buttonStyle
  let buttonIcon

  if (punchlogs.data && punchlogs.data.punch_logs[0] === undefined) {
    buttonStyle = styles.startButton
    buttonIcon = 'play'
  } else if (punchlogs.data && punchlogs.data.punch_logs[0].log_out === null) {
    buttonStyle = styles.stopButton
    buttonIcon = 'stop'
  } else {
    buttonStyle = styles.startButton
    buttonIcon = 'play'
  }

  return (
    <View style={styles.punchLogWrapper} testID={'punchCard'}>
      <View style={styles.info}>
        <Text style={styles.title}>Today's Punch Logs</Text>
        {punchlogs.data && punchlogs.data.punch_logs.length > 0 ? (
          <>
            {punchlogs.data.punch_logs.map((log, index) => (
              <Text key={index} style={styles.text}>
                In : {log.log_in} {log.log_out && `Out: ${log.log_out}`}
              </Text>
            ))}
          </>
        ) : (
          <Text style={styles.text}>No Punch Logs.</Text>
        )}
      </View>
      <TouchableOpacity
        testID={buttonIcon === 'play' ? 'startButton' : 'stopButton'}
        activeOpacity={1}
        style={buttonStyle}
        onPress={() => dispatch(createPunchLog(navigation))}>
        <Icon name={buttonIcon} size={32} color="rgba(0,0,0,0.4)" />
      </TouchableOpacity>
    </View>
  )
}

export default PunchLog
