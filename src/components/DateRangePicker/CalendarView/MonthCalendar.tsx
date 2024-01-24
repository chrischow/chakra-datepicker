import { Button, SimpleGrid, VStack } from '@chakra-ui/react'
import { ReactElement } from 'react'
import Navigator from '../../../common/Navigator'
import { shortMonths } from '../../../common/constants'
import { useDateRangePicker } from '../DateRangePickerContext'
import { Mode } from '../types'

const MonthCalendar = ({ mode }: { mode: Mode }) => {
  const {
    // Start date state
    setStartCalendarView,
    selectedStartDate,
    displayStartDate,
    setDisplayStartDate,
    // End date state
    setEndCalendarView,
    selectedEndDate,
    displayEndDate,
    setDisplayEndDate,
    // Customisation
    calendarProps: { calendarButtonProps },
    colorScheme,
    navProps: { navCenterButtonProps },
  } = useDateRangePicker()

  const isStart = mode === 'start'
  const selectedDate = isStart ? selectedStartDate : selectedEndDate
  const displayDate = isStart ? displayStartDate : displayEndDate
  const setDisplayDate = isStart ? setDisplayStartDate : setDisplayEndDate
  const setCalendarView = isStart ? setStartCalendarView : setEndCalendarView

  // Functions for navigator action buttons
  const currentYear = displayDate.getFullYear()
  const currentDisplayMonth = displayDate.getMonth()
  const currentDisplayYear = displayDate.getFullYear()

  const moveToPreviousYear = () => {
    const newDisplayDate = new Date(currentDisplayYear - 1, currentDisplayMonth, 1)
    newDisplayDate.setHours(0, 0, 0, 0)
    setDisplayDate(newDisplayDate)
  }

  const moveToNextYear = () => {
    const newDisplayDate = new Date(currentDisplayYear + 1, currentDisplayMonth, 1)
    newDisplayDate.setHours(0, 0, 0, 0)
    setDisplayDate(newDisplayDate)
  }

  // Month calendar logic
  const monthButtons: ReactElement[] = []
  for (const [idx, month] of shortMonths.entries()) {
    const isSelected = selectedDate && selectedDate.getMonth() === idx
    monthButtons.push(
      <Button
        key={month.shortName}
        size="sm"
        colorScheme={isSelected ? colorScheme : undefined}
        variant={isSelected ? 'solid' : 'ghost'}
        {...calendarButtonProps}
        onClick={() => {
          const newDisplayDate = new Date(currentDisplayYear, month.number, 1)
          newDisplayDate.setHours(0, 0, 0, 0)
          setDisplayDate(newDisplayDate)
          setCalendarView('day')
        }}
      >
        {month.shortName}
      </Button>,
    )
  }
  return (
    <VStack width="100%">
      <Navigator
        centerElement={
          <Button width="100%" variant="ghost" {...navCenterButtonProps} onClick={() => setCalendarView('year')}>
            {currentYear}
          </Button>
        }
        backIconButtonAction={moveToPreviousYear}
        forwardIconButtonAction={moveToNextYear}
      />
      <SimpleGrid columns={4} gap={2} width="100%" mt={3}>
        {monthButtons}
      </SimpleGrid>
    </VStack>
  )
}

export default MonthCalendar
