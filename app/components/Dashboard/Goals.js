import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const Goals = ({currentGoals, previousGoals}) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.goalViewStyle}>
        <Text style={styles.goalTextStyle}>Goals</Text>
        <View style={styles.bottomLineStyle} />
        <View>
          <View style={{paddingVertical: 10}}>
            <Text style={styles.goalTitleStyle}>Current Goals</Text>
            <Text>({currentGoals?.year})</Text>
          </View>
          {currentGoals?.goals?.map((goal, index) => {
            return (
              <View key={index} style={styles.goalView}>
                <View style={styles.goalTextViewStyle} />
                <Text key={index} style={{marginLeft: 10}}>
                  {goal}
                </Text>
              </View>
            )
          })}
        </View>
        {previousGoals?.goals?.length > 0 ? (
          <View>
            <View style={{paddingVertical: 10}}>
              <Text style={styles.goalTitleStyle}>Previous Goals</Text>
              <Text>({previousGoals?.year})</Text>
            </View>
            {previousGoals?.goals?.map((goal, index) => {
              return (
                <View style={styles.goalView} key={index}>
                  <View style={styles.goalTextViewStyle} />
                  <Text style={{marginLeft: 10}}>{goal}</Text>
                </View>
              )
            })}
          </View>
        ) : null}
      </View>
    </View>
  )
}

export default Goals

const styles = StyleSheet.create({
  bottomLineStyle: {
    borderBottomWidth: 2,
    borderBottomColor: '#e9ecef',
    paddingHorizontal: 10,
    width: '100%',
  },
  mainView: {
    padding: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 3,
  },
  goalView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  goalTextViewStyle: {
    padding: 2,
    backgroundColor: 'black',
    width: 8,
    height: 8,
    borderRadius: 20,
  },
  goalTitleStyle: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
  },
  goalTextStyle: {paddingVertical: 10, fontSize: 20, fontWeight: '800'},
  goalViewStyle: {flex: 1, marginLeft: 10, paddingBottom: 10},
})
