import { Button, SimpleGrid, Spacer, VStack } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { useDatePicker } from '../DatePickerContext'
import Navigator from '../Navigator'
import { getCurrentScore } from '../utils'

const YearCalendar = () => {
  const {
    displayDate,
    setDisplayDate,
    setCalendarView,
    calendarProps: { calendarButtonProps },
    validYears,
  } = useDatePicker()

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
    setDisplayDate(newDisplayDate)
  }

  const moveToNextScore = () => {
    if (isForwardDisabled) return

    const newDisplayDate = new Date(currentDisplayYear + 20, currentDisplayMonth, 1)
    newDisplayDate.setHours(0, 0, 0, 0)
    setDisplayDate(newDisplayDate)
  }

  // Day calendar logic
  const yearButtons: ReactElement[] = []
  for (let i = currentScore.start; i <= currentScore.end; i++) {
    yearButtons.push(
      <Button
        variant="ghost"
        size="sm"
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
