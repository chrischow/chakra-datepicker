import { useDatePicker } from '../DatePickerContext'
import DayCalendar from './DayCalendar'
import MonthCalendar from './MonthCalendar'
import YearCalendar from './YearCalendar'

export interface CalendarViewProps {
  colorScheme: string & {}
}

const CalendarView = ({ colorScheme }: CalendarViewProps) => {
  const { calendarView } = useDatePicker()
  return (
    <>
      {calendarView === 'day' && <DayCalendar colorScheme={colorScheme} />}
      {calendarView === 'month' && <MonthCalendar />}
      {calendarView === 'year' && <YearCalendar />}
    </>
  )
}

export default CalendarView
