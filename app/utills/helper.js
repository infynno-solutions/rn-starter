import moment from 'moment'

export const getWeeksOfMonth = () => {
  const currentMonth1 = moment().month()
  const weeks = []

  let currentDate = moment().startOf('month').day('Monday')
  if (currentDate.month() !== currentMonth1) {
    currentDate.add(1, 'week')
  }

  while (currentDate.month() === currentMonth1) {
    weeks.push({
      title: `${currentDate.format('MMM D')} - ${currentDate
        .clone()
        .endOf('week')
        .add(1, 'day')
        .format('MMM D')}`,
      weekNumber: currentDate.isoWeek(),
    })
    currentDate.add(1, 'week')
  }
  return weeks
}

export function getWeeksInCurrentMonth() {
  const currentMonth2 = moment().month()
  const firstDayOfMonth = moment()
    .month(currentMonth2)
    .startOf('month')
    .isoWeekday(1)
  const lastDayOfMonth = moment()
    .month(currentMonth2)
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
