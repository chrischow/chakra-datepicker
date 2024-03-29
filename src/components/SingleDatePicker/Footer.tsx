import { Button, HStack } from '@chakra-ui/react'
import { useDatePicker } from './DatePickerContext'

const Footer = () => {
  const {
    setCalendarView,
    selectedDate,
    setDisplayDate,
    resetToToday,
    clearDate,
    colorScheme,
    calendarProps: {
      footerClearButtonProps,
      footerClearButtonText,
      footerGoToButtonProps,
      footerGoToButtonText,
      footerTodayButtonProps,
      footerTodayButtonText,
    },
  } = useDatePicker()

  return (
    <HStack mt={3} mb={3} width="100%" justifyContent="space-around" alignItems="center">
      <Button size="sm" variant="link" colorScheme={colorScheme} {...footerTodayButtonProps} onClick={resetToToday}>
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
      <Button size="sm" variant="link" colorScheme="red" {...footerClearButtonProps} onClick={clearDate}>
        {footerClearButtonText}
      </Button>
    </HStack>
  )
}

export default Footer
