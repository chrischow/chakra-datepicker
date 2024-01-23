import { Button, VStack } from '@chakra-ui/react'
import { useDatePicker } from './DatePickerContext'

const Footer = () => {
  const {
    resetToToday,
    selectedDate,
    setDisplayDate,
    setCalendarView,
    colorScheme,
    calendarProps: { footerTodayButtonProps, footerGoToButtonProps },
  } = useDatePicker()

  return (
    <VStack mt={4} gap={4} alignItems="center">
      <Button size="sm" variant="link" colorScheme={colorScheme} {...footerTodayButtonProps} onClick={resetToToday}>
        Select today's date
      </Button>
      <Button
        size="sm"
        variant="link"
        colorScheme={colorScheme}
        {...footerGoToButtonProps}
        onClick={() => {
          setDisplayDate(selectedDate)
          setCalendarView('day')
        }}
      >
        Go to selected date
      </Button>
    </VStack>
  )
}

export default Footer
