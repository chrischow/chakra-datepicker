import { Heading, VStack } from '@chakra-ui/react'
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
      <VStack>
        <Heading size="sm">{mode === 'start' ? 'Start' : 'End'} Date</Heading>
        {calendarView === 'day' && <DayCalendar mode={mode} />}
        {calendarView === 'month' && <MonthCalendar mode={mode} />}
        {calendarView === 'year' && <YearCalendar mode={mode} />}
        <Footer mode={mode} />
      </VStack>
    </>
  )
}

export default CalendarView
