import React, {Component} from 'react'
import {isSunday, isSaturday, getWeekOfMonth, isPast, isToday} from 'date-fns'
import Day from 'react-native-calendars/src/calendar/day/basic'

class CustomDay extends Component {
  render() {
    const {date, marking, startDate, endDate} = this.props
    const start_date = new Date(startDate)
    const end_date = new Date(endDate)
    const disabled =
      isSunday(date.timestamp) ||
      (isPast(date.timestamp) && !isToday(date.timestamp)) ||
      (isSaturday(date.timestamp) &&
        getWeekOfMonth(date.timestamp) % 2 === 1) ||
      (start_date && start_date.getTime() > date.timestamp) ||
      (end_date && end_date.getTime() > date.timestamp)

    return (
      <Day
        {...this.props}
        marking={{
          ...marking,
          disabled,
        }}
        disableTouchEvent={disabled}
      />
    )
  }
}

export default CustomDay
