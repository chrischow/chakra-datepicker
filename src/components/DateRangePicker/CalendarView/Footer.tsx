import { Button, VStack } from '@chakra-ui/react'
import { useDateRangePicker } from '../DateRangePickerContext'
import { Mode } from '../types'

const Footer = ({ mode }: { mode: Mode }) => {
  const {
    setStartCalendarView,
    selectedStartDate,
    setDisplayStartDate,
    setEndCalendarView,
    selectedEndDate,
    setDisplayEndDate,
    resetToToday,
    colorScheme,
    calendarProps: { footerTodayButtonProps, footerGoToButtonProps },
  } = useDateRangePicker()

  const isStart = mode === 'start'
  const selectedDate = isStart ? selectedStartDate : selectedEndDate
  const setDisplayDate = isStart ? setDisplayStartDate : setDisplayEndDate
  const setCalendarView = isStart ? setStartCalendarView : setEndCalendarView

  return (
    <VStack mt={4} gap={4} alignItems="center">
      <Button
        size="sm"
        variant="link"
        colorScheme={colorScheme}
        {...footerTodayButtonProps}
        onClick={() => resetToToday(mode)}
      >
        Select today's date
      </Button>
      <Button
        size="sm"
        variant="link"
        colorScheme={colorScheme}
        {...footerGoToButtonProps}
        onClick={() => {
          if (selectedDate) {
            setDisplayDate(selectedDate)
          }
          setCalendarView('day')
        }}
      >
        Go to selected date
      </Button>
    </VStack>
  )
}

export default Footer
