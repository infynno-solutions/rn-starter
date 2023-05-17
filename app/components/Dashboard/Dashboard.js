import React, {useEffect, useState} from 'react'
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
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
import {datePickerData} from '../../utills/helper'
import DailyUpdate from './DailyUpdate'
import {DatePickerModal} from 'react-native-paper-dates'
import KeyResponsibility from './KeyResponsibility'
import Goals from './Goals'
import {Menu} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
SplashScreen.hide()

const Dashboard = ({navigation}) => {
  const {loading, data} = useSelector((state) => ({
    loading: state.DashboardReducers.loading,
    data: state.DashboardReducers.data,
  }))
  const {profile} = useSelector((state) => state.ProfileReducers)
  const dispatch = useDispatch()
  const currentMonth = moment().format('MMM YYYY')

  const [currentWeek, setCurrentWeek] = useState({
    start_date: moment().startOf('isoWeek').format('DD-MM-YYYY'),
    end_date: moment().endOf('isoWeek').format('DD-MM-YYYY'),
  })
  const [selectedValue, setSelectedValue] = useState({
    title: 'Current Week',
    value: 1,
  })
  const [visible, setVisible] = React.useState(false)
  const [visibleMenu, setVisibleMenu] = React.useState(false)

  const closeMenu = () => setVisibleMenu(false)

  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onChange = React.useCallback(({startDate, endDate}) => {
    setVisible(false)
    setCurrentWeek({
      start_date: moment(startDate).format('DD-MM-YYYY'),
      end_date: moment(endDate).format('DD-MM-YYYY'),
    })
    setSelectedValue({
      title: `${moment(startDate).format('DD-MM-YYYY')} - ${moment(
        endDate
      ).format('DD-MM-YYYY')}`,
      value: 4,
    })
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCurrentScreen('Dashboard'))
      return () => {}
    }, [dispatch])
  )

  useEffect(() => {
    dispatch(
      fetchStats(navigation, {
        start_date: currentWeek.start_date,
        end_date: currentWeek.end_date,
      })
    )
    dispatch(fetchProfile(navigation, true))
  }, [dispatch, navigation, currentWeek])

  const onRefresh = React.useCallback(() => {
    // dispatch(fetchStats(navigation))
    dispatch(fetchPunchLogs(navigation))
    dispatch(
      fetchStats(navigation, {
        start_date: currentWeek.start_date,
        end_date: currentWeek.end_date,
      })
    )
    setCurrentWeek({
      start_date: moment().startOf('isoWeek').format('DD-MM-YYYY'),
      end_date: moment().endOf('isoWeek').format('DD-MM-YYYY'),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigation])

  return (
    <>
      <ScrollView
        testID={'dashboardScreen'}
        style={styles.dashboardContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
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
        {data && data.dailyUpdates && (
          <>
            <DailyUpdate dailyUpdates={data?.dailyUpdates} profile={profile} />
          </>
        )}
        {data && data.final_punch && data.final_punch && (
          <>
            <DatePickerModal
              mode="range"
              locale="en-GB"
              visible={visible}
              onDismiss={onDismiss}
              startDate={moment(currentWeek.start_date, 'DD-MM-YYYY').toDate()}
              endDate={moment(currentWeek.end_date, 'DD-MM-YYYY').toDate()}
              onConfirm={onChange}
              saveLabel="Save"
              label="Select period"
              startLabel="From"
              endLabel="To"
              calendarIcon={'none'}
              editIcon={'none'}
              disableSafeTop={true}
              animationType="fade"
              disableStatusBar={true}
            />

            <Menu
              visible={visibleMenu}
              style={{width: '90%'}}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity
                  onPress={() => setVisibleMenu(true)}
                  style={styles.selectedTitleStyle}>
                  <Text style={styles.selectedTextStyle}>
                    {selectedValue.title}
                  </Text>
                  <Icon name="menu-down" size={20} />
                </TouchableOpacity>
              }>
              {datePickerData?.map((week, index) => {
                return (
                  <Menu.Item
                    titleStyle={
                      selectedValue.value === week.id
                        ? {color: Config.primayColor}
                        : {color: 'black'}
                    }
                    key={week.id}
                    onPress={() => {
                      setSelectedValue({
                        title: week.title,
                        value: week.id,
                      })
                      setCurrentWeek(
                        datePickerData.find((item) => item.id === week.id).value
                      )
                    }}
                    title={week.title}
                  />
                )
              })}
              <Menu.Item
                titleStyle={
                  selectedValue.value === 4 && {color: Config.primayColor}
                }
                onPress={() => {
                  setVisible(true)
                }}
                title={'Custom Date'}
              />
            </Menu>

            <Chart data={data?.final_punch} name="Punchlogs" />
            <View style={styles.worklogsStyle}>
              <Chart data={data?.final_work} name="Worklogs" />
            </View>
          </>
        )}

        {data && data.designation_key_responsibility_areas && (
          <>
            <KeyResponsibility
              keyResponsibility={data?.designation_key_responsibility_areas}
            />
          </>
        )}
        {data && (data.current_goals || data?.previous_goals) && (
          <>
            <Goals
              currentGoals={data?.current_goals}
              previousGoals={data?.previous_goals}
            />
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

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: Config.backgroundColor,
    padding: 10,
  },
  worklogsStyle: {
    marginBottom: 10,
  },
  selectedTitleStyle: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  selectedTextStyle: {
    fontWeight: '800',
    paddingBottom: 10,
  },
})
