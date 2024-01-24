import { CalendarIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Input, Text } from '@chakra-ui/react'
import { useDateRangePicker } from './DateRangePickerContext'

const DateRangeInput = () => {
  const { colorScheme } = useDateRangePicker()
  return (
    <HStack alignItems="center" pr={2} gap={2} border="1px" borderColor="gray.200" borderRadius={6}>
      <Input textAlign="center" placeholder="dd/mm/yyyy" variant="filled" focusBorderColor={`${colorScheme}.500`} />
      <Text>to</Text>
      <Input textAlign="center" placeholder="dd/mm/yyyy" variant="filled" focusBorderColor={`${colorScheme}.500`} />
      <IconButton size='sm' icon={<CalendarIcon />} variant="ghost" aria-label="Open calendar" />
    </HStack>
  )
}

export default DateRangeInput
