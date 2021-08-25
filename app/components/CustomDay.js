import React, {Component} from 'react'
import {isSunday, isSaturday, getWeekOfMonth, isPast, isToday} from 'date-fns'
import Day from 'react-native-calendars/src/calendar/day/basic'

class CustomDay extends Component {
  render() {
    const {date, marking} = this.props

    marking.disabled =
      isSunday(date.timestamp) ||
      (isPast(date.timestamp) && !isToday(date.timestamp)) ||
      (isSaturday(date.timestamp) && getWeekOfMonth(date.timestamp) === 1) ||
      (isSaturday(date.timestamp) && getWeekOfMonth(date.timestamp) === 3)
    // ||(isSaturday(date.timestamp) && getWeekOfMonth(date.timestamp) === 5);
    marking.disableTouchEvent = marking.disabled === true ? true : false
    return <Day {...this.props} />
  }
}

export default CustomDay
