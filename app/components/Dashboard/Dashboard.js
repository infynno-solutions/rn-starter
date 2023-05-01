import React, {useEffect, useState} from 'react'
import {ScrollView, StyleSheet, RefreshControl, View} from 'react-native'
import IconBox from '../Shared/IconBox'
import {Config} from '../../common'
import {useDispatch, useSelector} from 'react-redux'
import {fetchStats, fetchPunchLogs} from './DashboardActions'
import moment from 'moment'
import Chart from './Chart'
import SplashScreen from 'react-native-splash-screen'
import {fetchProfile} from '../Profile/ProfileActions'
import {getCurrentScreen} from '../Auth/AuthActions'
import {useFocusEffect} from '@react-navigation/core'
import {Picker} from '@react-native-picker/picker'
import {getWeeksInCurrentMonth} from '../../utills/helper'

SplashScreen.hide()

const Dashboard = ({navigation}) => {
  const {loading, data} = useSelector((state) => ({
    loading: state.DashboardReducers.loading,
    data: state.DashboardReducers.data,
  }))
  const dispatch = useDispatch()
  const currentMonth = moment().format('MMM YYYY')

  const [currentWeek, setCurrentWeek] = useState({
    final_punch: moment().isoWeekday(1).week(),
    final_work: moment().isoWeekday(1).week(),
  })
  const [finalData, setFinalData] = useState({
    final_punch: data?.final_punch || [],
    final_work: data?.final_work || [],
  })

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentScreen('Dashboard'))
      return () => {}
    }, [dispatch])
  )

  useEffect(() => {
    dispatch(fetchStats(navigation))
    dispatch(fetchProfile(navigation, true))
  }, [dispatch, navigation])

  const styles = StyleSheet.create({
    dashboardContainer: {
      flex: 1,
      backgroundColor: Config.backgroundColor,
      padding: 10,
    },
    worklogsStyle: {
      marginBottom: 10,
    },
  })

  useEffect(() => {
    setFinalData({
      final_punch: data?.final_punch || [],
      final_work: data?.final_work || [],
    })
  }, [data, currentWeek])

  return (
    <>
      <ScrollView
        testID={'dashboardScreen'}
        style={styles.dashboardContainer}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              dispatch(fetchStats(navigation))
              dispatch(fetchPunchLogs(navigation))
              dispatch(fetchStats(navigation))
              setCurrentWeek({
                final_work: moment().isoWeekday(1).week(),
                final_punch: moment().isoWeekday(1).week(),
              })
            }}
          />
        }>
        <IconBox
          backgroundColor="rgba(115,108,199,.4)"
          color="#736cc7"
          icon="calendar"
          count={`${data ? data.leave_count : '0'}/12`}
          name="Leave Taken / Total Leaves"
          testID={'leavesCount'}
          onPress={() =>
            navigation.navigate('BottomNavigator', {screen: 'LeavesStack'})
          }
        />
        <IconBox
          backgroundColor="rgba(57,154,242,.4)"
          color="#399AF2"
          icon="alarm"
          count={`${data ? data.total_average_hours_month : '00:00'} (Avg.)`}
          name={`Punching Hours - ${currentMonth}`}
          testID={'averagePunchlog'}
        />
        <IconBox
          backgroundColor="rgba(47,191,160,.4)"
          color="#2fbfa0"
          icon="calendar-clock"
          count={`${data ? data.average_work_per_month : '00:00'} (Avg.)`}
          name={`Working Hours - ${currentMonth}`}
          testID={'averageWorklog'}
        />
        {data && data.final_punch && data.final_punch && (
          <>
            <Picker
              selectedValue={currentWeek.final_punch}
              mode="dropdown"
              placeholder={'Select week range'}
              onValueChange={(itemValue) =>
                setCurrentWeek({
                  ...currentWeek,
                  final_punch: itemValue,
                })
              }>
              {getWeeksInCurrentMonth()?.map((week, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={week.title}
                    value={week.weekNumber}
                  />
                )
              })}
            </Picker>
            <Chart
              data={finalData?.final_punch.filter(
                (data1) =>
                  moment(data1.log_date).isoWeek() === currentWeek.final_punch
              )}
              name="Punchlogs"
            />
            <View style={styles.worklogsStyle}>
              <Picker
                selectedValue={currentWeek.final_work}
                mode="dropdown"
                placeholder={'Select week range'}
                onValueChange={(itemValue) =>
                  setCurrentWeek({
                    ...currentWeek,
                    final_work: itemValue,
                  })
                }>
                {getWeeksInCurrentMonth()?.map((week, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={week.title}
                      value={week.weekNumber}
                    />
                  )
                })}
              </Picker>
              <Chart
                data={finalData?.final_work.filter(
                  (data1) =>
                    moment(data1.log_date).isoWeek() === currentWeek.final_work
                )}
                name="Worklogs"
              />
            </View>
          </>
        )}
      </ScrollView>
    </>
  )
}

Dashboard.navigationOptions = () => ({
  header: null,
})

export default Dashboard
