import { Box, Button, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { format } from 'date-fns'
import { ReactElement } from 'react'
import { useDatePicker } from '../DatePickerContext'
import Navigator from '../../../common/Navigator'
import { days, monthLookup } from '../../../common/constants'

const DayCalendar = () => {
  const {
    selectedDate,
    // State
    setCalendarView,
    selectedDateString,
    setSelectedDateString,
    displayDate,
    setDisplayDate,
    // Utilities
    getDatesInMonth,
    isValidDate,
    // Customisation
    calendarProps: { calendarButtonProps },
    colorScheme,
    navProps: { navCenterButtonProps },
  } = useDatePicker()

  // Functions for navigator action buttons
  const currentDisplayMonthData = monthLookup[displayDate.getMonth() as keyof typeof monthLookup]
  const currentDisplayMonth = displayDate.getMonth()
  const currentDisplayYear = displayDate.getFullYear()

  const moveToPreviousMonth = () => {
    const newDisplayDate = new Date(currentDisplayYear, currentDisplayMonth - 1, 1)
    newDisplayDate.setHours(0, 0, 0, 0)
    setDisplayDate(newDisplayDate)
  }

  const moveToNextMonth = () => {
    const newDisplayDate = new Date(currentDisplayYear, currentDisplayMonth + 1, 1)
    newDisplayDate.setHours(0, 0, 0, 0)
    setDisplayDate(newDisplayDate)
  }

  // Day calendar logic
  const dates = getDatesInMonth(displayDate)

  const handleDateSelection = (date: Date) => {
    setSelectedDateString(format(date, 'dd/MM/yyyy'))
  }

  const dayButtons: ReactElement[] = []
  let firstRow = true
  for (const date of dates) {
    const day = date.getDay()
    const isSelected = selectedDate && isValidDate(selectedDateString) && date.getTime() === selectedDate.getTime()

    if (firstRow && day >= 0) {
      for (let i = 0; i < day; i++) {
        dayButtons.push(<Text key={`day-${i}`}></Text>)
      }
      firstRow = false
    }
    dayButtons.push(
      <Button
        size="sm"
        colorScheme={isSelected ? colorScheme : undefined}
        variant={isSelected ? 'solid' : 'ghost'}
        {...calendarButtonProps}
        key={date.getDate()}
        onClick={() => handleDateSelection(date)}
      >
        {date.getDate()}
      </Button>,
    )
  }

  // Pad calendar to take up 6 rows to prevent jumps when months have fewer rows of days
  if (dayButtons.length <= 35) {
    for (let i = dayButtons.length; i < 36; i++) {
      dayButtons.push(
        <Button size="sm" {...calendarButtonProps} key={`day-${i}`} _hover={{ cursor: 'default' }} opacity={0}>
          {' '}
        </Button>,
      )
    }
  }

  return (
    <VStack width="100%">
      <Navigator
        centerElement={
          <Button width="100%" {...navCenterButtonProps} onClick={() => setCalendarView('month')}>
            {currentDisplayMonthData.long} {currentDisplayYear}
          </Button>
        }
        backIconButtonAction={moveToPreviousMonth}
        forwardIconButtonAction={moveToNextMonth}
      />
      <SimpleGrid columns={7} gap={2} width="100%" mt={3}>
        {days.map((day) => (
          <Box key={day} fontWeight="semibold" textAlign="center">
            {day}
          </Box>
        ))}
        {dayButtons}
      </SimpleGrid>
    </VStack>
  )
}

export default DayCalendar
