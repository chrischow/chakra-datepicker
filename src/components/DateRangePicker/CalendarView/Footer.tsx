import { Button, HStack } from '@chakra-ui/react'
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
    calendarProps: { footerGoToButtonProps, footerGoToButtonText, footerTodayButtonProps, footerTodayButtonText },
  } = useDateRangePicker()

  const isStart = mode === 'start'
  const selectedDate = isStart ? selectedStartDate : selectedEndDate
  const setDisplayDate = isStart ? setDisplayStartDate : setDisplayEndDate
  const setCalendarView = isStart ? setStartCalendarView : setEndCalendarView

  return (
    <HStack mt={3} mb={3} width="100%" justifyContent="space-around" alignItems="center">
      <Button
        size="sm"
        variant="link"
        colorScheme={colorScheme}
        {...footerTodayButtonProps}
        onClick={() => resetToToday(mode)}
      >
        {footerTodayButtonText}
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
        {footerGoToButtonText}
      </Button>
    </HStack>
  )
}

export default Footer
