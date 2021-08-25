import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Config} from '../../common'
import moment from 'moment'

const HolidayCard = ({holiday}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.holidayNameWrapper}>
        <View style={styles.dateWrapper}>
          <Text style={styles.month}>{moment(holiday.date).format('MMM')}</Text>
          <Text style={styles.date}>{moment(holiday.date).format('DD')}</Text>
        </View>
        <Text style={styles.holidayName}>{holiday.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowOffset: {width: 2, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 0.5,
    marginBottom: 0,
  },
  holidayNameWrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  month: {
    backgroundColor: Config.primayColor,
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    fontWeight: 'bold',
    width: 80,
    textAlign: 'center',
  },
  date: {
    backgroundColor: Config.backgroundColor,
    width: 80,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  holidayId: {
    backgroundColor: Config.backgroundColor,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    minWidth: 50,
    textAlign: 'center',
  },
  holidayName: {
    fontSize: 16,
    textAlign: 'center',
  },
})

export default HolidayCard
