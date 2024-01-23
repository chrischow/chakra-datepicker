import { useDatePicker } from '../DatePickerContext'
import DayCalendar from './DayCalendar'
import MonthCalendar from './MonthCalendar'
import YearCalendar from './YearCalendar'

const CalendarView = () => {
  const { calendarView } = useDatePicker()
  return (
    <>
      {calendarView === 'day' && <DayCalendar />}
      {calendarView === 'month' && <MonthCalendar />}
      {calendarView === 'year' && <YearCalendar />}
    </>
  )
}

export default CalendarView
