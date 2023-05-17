import moment from 'moment'

export function getAllMonth() {
  const months = []
  for (let i = 1; i <= 12; i++) {
    const month = moment().month(i - 1)
    months.push({
      value: month.format('MM'),
      month: month.format('MMM'),
    })
  }
  return months
}

export function getYears() {
  const years = []
  const dateStart = moment().subtract(4, 'y')
  const dateEnd = moment().add(10, 'y')
  while (dateEnd.diff(dateStart, 'years') >= 0) {
    years.push(dateStart.format('YYYY'))
    dateStart.add(1, 'year')
  }
  return years
}

export function getWeeksInCurrentMonth(week) {
  const currentMonth = moment().isoWeek(week).month()
  const firstDayOfMonth = moment()
    .month(currentMonth)
    .startOf('month')
    .isoWeekday(1)
  const lastDayOfMonth = moment()
    .month(currentMonth)
    .endOf('month')
    .isoWeekday(7)
  const weeks = []
  let weekStart = firstDayOfMonth
  while (weekStart.isSameOrBefore(lastDayOfMonth)) {
    const weekEnd = moment.min(
      weekStart.clone().endOf('isoWeek'),
      lastDayOfMonth
    )
    const weekNumber = weekStart.isoWeek()
    const weekTitle = `${weekStart.format('DD MMM')} - ${weekEnd.format(
      'DD MMM'
    )}`
    weeks.push({title: weekTitle, weekNumber})
    weekStart = weekEnd.clone().add(1, 'days')
  }
  return weeks
}

export const datePickerData = [
  {
    title: 'Current week',
    id: 1,
    value: {
      start_date: moment().startOf('isoWeek').format('DD-MM-YYYY'),
      end_date: moment().endOf('isoWeek').format('DD-MM-YYYY'),
    },
  },
  {
    title: 'Current Month',
    id: 2,
    value: {
      start_date: moment().startOf('month').format('DD-MM-YYYY'),
      end_date: moment().endOf('month').format('DD-MM-YYYY'),
    },
  },
  {
    title: 'Last Month',
    id: 3,
    value: {
      start_date: moment()
        .subtract(1, 'month')
        .startOf('month')
        .format('DD-MM-YYYY'),
      end_date: moment()
        .subtract(1, 'month')
        .endOf('month')
        .format('DD-MM-YYYY'),
    },
  },
]
