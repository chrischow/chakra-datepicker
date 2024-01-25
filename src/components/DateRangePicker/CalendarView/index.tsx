import { useDateRangePicker } from '../DateRangePickerContext'
import { Mode } from '../types'
import DayCalendar from './DayCalendar'
import Footer from './Footer'
import MonthCalendar from './MonthCalendar'
import YearCalendar from './YearCalendar'

const CalendarView = ({ mode }: { mode: Mode }) => {
  const { startCalendarView, endCalendarView } = useDateRangePicker()
  const calendarView = mode === 'start' ? startCalendarView : endCalendarView

  return (
    <>
      {calendarView === 'day' && <DayCalendar mode={mode} />}
      {calendarView === 'month' && <MonthCalendar mode={mode} />}
      {calendarView === 'year' && <YearCalendar mode={mode} />}
      <Footer mode={mode} />
    </>
  )
}

export default CalendarView
