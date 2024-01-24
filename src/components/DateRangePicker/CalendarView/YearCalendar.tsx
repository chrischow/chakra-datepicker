import { Button, SimpleGrid, Spacer, VStack } from '@chakra-ui/react'
import { ReactElement } from 'react'
import Navigator from '../../../common/Navigator'
import { getCurrentScore } from '../../../common/utils'
import { useDateRangePicker } from '../DateRangePickerContext'
import { Mode } from '../types'

const YearCalendar = ({ mode }: { mode: Mode }) => {
  const {
    selectedStartDate,
    displayStartDate,
    setDisplayStartDate,
    selectedEndDate,
    displayEndDate,
    setDisplayEndDate,
    setStartCalendarView,
    setEndCalendarView,
    colorScheme,
    calendarProps: { calendarButtonProps },
    validYears,
  } = useDateRangePicker()

  const isStart = mode === 'start'
  const selectedDate = isStart ? selectedStartDate : selectedEndDate
  const displayDate = isStart ? displayStartDate : displayEndDate
  const setDisplayDate = isStart ? setDisplayStartDate : setDisplayEndDate
  const setCalendarView = isStart ? setStartCalendarView : setEndCalendarView

  // Functions for navigator action buttons
  const currentDisplayMonth = displayDate.getMonth()
  const currentDisplayYear = displayDate.getFullYear()
  const currentScore = getCurrentScore(currentDisplayYear)

  const isBackDisabled = currentScore.start - 20 < validYears.start
  const isForwardDisabled = currentScore.end + 20 > validYears.end

  const moveToPreviousScore = () => {
    if (isBackDisabled) return

    const newDisplayDate = new Date(currentDisplayYear - 20, currentDisplayMonth, 1)
    newDisplayDate.setHours(0, 0, 0, 0)
    setDisplayEndDate(newDisplayDate)
  }

  const moveToNextScore = () => {
    if (isForwardDisabled) return

    const newDisplayDate = new Date(currentDisplayYear + 20, currentDisplayMonth, 1)
    newDisplayDate.setHours(0, 0, 0, 0)
    setDisplayEndDate(newDisplayDate)
  }

  // Day calendar logic
  const yearButtons: ReactElement[] = []
  for (let i = currentScore.start; i <= currentScore.end; i++) {
    const isSelected = selectedDate && selectedDate.getFullYear() === i
    yearButtons.push(
      <Button
        size="sm"
        colorScheme={isSelected ? colorScheme : undefined}
        variant={isSelected ? 'solid' : 'ghost'}
        {...calendarButtonProps}
        key={`year-${i}`}
        onClick={() => {
          const newDisplayDate = new Date(i, currentDisplayMonth, 1)
          newDisplayDate.setHours(0, 0, 0, 0)
          setDisplayDate(newDisplayDate)
          setCalendarView('month')
        }}
      >
        {i}
      </Button>,
    )
  }

  return (
    <VStack width="100%">
      <Navigator
        centerElement={<Spacer />}
        backIconButtonProps={{ isDisabled: isBackDisabled }}
        backIconButtonAction={moveToPreviousScore}
        forwardIconButtonProps={{ isDisabled: isForwardDisabled }}
        forwardIconButtonAction={moveToNextScore}
      />
      <SimpleGrid columns={5} gap={2} width="100%" mt={3}>
        {yearButtons}
      </SimpleGrid>
    </VStack>
  )
}

export default YearCalendar
