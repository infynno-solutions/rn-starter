import React, {useEffect} from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Animated,
  RefreshControl,
  StyleSheet,
  Image,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {fetchHolidays} from './HolidaysActions'
import {Config} from '../../common'
import HolidayCard from './HolidayCard'
import Images from '../../../assets/images'

const styles = StyleSheet.create({
  noHolidays: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  holidayContainer: {
    flex: 1,
    backgroundColor: Config.backgroundColor,
  },
  loaderViewStyle: {
    height: '100%',
    justifyContent: 'center',
  },
  noDataFound: {
    height: 50,
    width: 50,
  },
  noHolidayText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainerStyle: {
    paddingBottom: 20,
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
  const {isLoading, holidays} = useSelector((state) => ({
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
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => dispatch(fetchHolidays())}
            />
          }
          ListEmptyComponent={
            <View style={styles.noHolidays}>
              <Image source={Images.noDataFound} style={styles.noDataFound} />
              <Text style={styles.noHolidayText}>No Holidays.</Text>
            </View>
          }
        />
      ) : (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator size="large" color={Config.primayColor} />
        </View>
      )}
    </View>
  )
}

HolidaysScreen.navigationOptions = () => ({
  header: null,
})

export default HolidaysScreen
