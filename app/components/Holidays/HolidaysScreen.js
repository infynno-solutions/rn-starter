import React, {useEffect} from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Animated,
  RefreshControl,
  StyleSheet,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {fetchHolidays} from './HolidaysActions'
import {Config} from '../../common'
import HolidayCard from './HolidayCard'

const styles = StyleSheet.create({
  noHolidays: {
    margin: 20,
  },
  holidayContainer: {
    flex: 1,
    backgroundColor: Config.backgroundColor,
  },
})

const AnimatedListView = Animated.createAnimatedComponent(FlatList)

const renderHolidaysView = ({item, index}) => {
  if (item === null) {
    return <View />
  }
  return <HolidayCard holiday={item} key={item.id} />
}

const HolidaysScreen = () => {
  const {isLoading, holidays} = useSelector(state => ({
    isLoading: state.HolidaysReducers.isLoading,
    holidays: state.HolidaysReducers.holidays,
  }))

  const dispatch = useDispatch()

  useEffect(() => dispatch(fetchHolidays()), [dispatch])

  return (
    <View style={styles.holidayContainer}>
      {holidays && !isLoading ? (
        <AnimatedListView
          data={holidays.holidays}
          keyExtractor={(item, index) => `holidays-${item.id} || ${index}`}
          renderItem={renderHolidaysView}
          refreshing={isLoading}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => dispatch(fetchHolidays())}
            />
          }
          ListEmptyComponent={
            <View style={styles.noHolidays}>
              <Text>No Holidays.</Text>
            </View>
          }
        />
      ) : (
        <ActivityIndicator size="large" color={Config.primayColor} />
      )}
    </View>
  )
}

HolidaysScreen.navigationOptions = () => ({
  header: null,
})

export default HolidaysScreen
