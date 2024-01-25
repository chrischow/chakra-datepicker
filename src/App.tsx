import { Box, Button, ChakraProvider, DarkMode, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import DateRangePicker from './components/DateRangePicker'
import SingleDatePicker from './components/SingleDatePicker'

function App() {
  const [date, setDate] = useState<Date | null>(new Date())

  const [date1, setDate1] = useState<Date | null>(null)
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), new Date()])
  const [dateRange1, setDateRange1] = useState<[Date | null, Date | null]>([null, null])

  useEffect(() => {
    console.log('[DEMO] Selected new date:', date)
  }, [date])

  return (
    <ChakraProvider>
      <Box p={16} width="700px" mb="500px">
        <VStack alignItems="start">
          <Heading size="lg">Default DatePicker</Heading>
          <SingleDatePicker onChange={setDate} />
        </VStack>

        <VStack mt={8} alignItems="start">
          <Heading size="lg">Self-managed Date</Heading>
          <Text>
            This allows you to pass <code>value</code> and <code>onChange</code> props to the component.
          </Text>
          <Text>Date: {date1 ? date1.toDateString() : date1}</Text>
          <Text>You can amend the date from outside the component:</Text>
          <HStack>
            <Button size="sm" onClick={() => setDate1(new Date('2023-01-01'))}>
              Set to 1 Jan 2023
            </Button>
            <Button size="sm" onClick={() => setDate1(new Date('2025-01-01'))}>
              Set to 1 Jan 2025
            </Button>
            <Button size="sm" onClick={() => setDate1(new Date('2020-01-01'))}>
              Reset
            </Button>
          </HStack>
          <SingleDatePicker value={date1} onChange={setDate1} allowManualInput={true} />
        </VStack>

        <VStack mt={8} alignItems="start">
          <Heading size="lg">Custom size and colour</Heading>
          <Text>Larger input box, larger calendar buttons</Text>
          <SingleDatePicker
            colorScheme="teal"
            onChange={setDate}
            inputProps={{ size: 'lg' }}
            inputButtonProps={{ size: 'md' }}
            calendarButtonProps={{ size: 'md' }}
          />
        </VStack>

        <VStack mt={8} alignItems="start">
          <Heading size="lg">Custom icons</Heading>
          <SingleDatePicker
            inputButtonProps={{ icon: <IoCalendarNumberOutline />, 'aria-label': 'Open Calendar' }}
            onChange={setDate}
            navBackButtonProps={{ icon: <BiSolidLeftArrow />, variant: 'outline' }}
            navForwardButtonProps={{ icon: <BiSolidRightArrow />, variant: 'outline' }}
            navCenterButtonProps={{ variant: 'outline' }}
          />
        </VStack>

        <VStack mt={8} alignItems="start">
          <Heading size="lg">Customised popover</Heading>
          <Text>Examples: massive arrow, prevent closing on blur, placement top.</Text>
          <SingleDatePicker onChange={setDate} popoverProps={{ arrowSize: 24, closeOnBlur: false, placement: 'top' }} />
        </VStack>
        <VStack mt={8} alignItems="start">
          <Heading size="lg">Customise everything</Heading>
          <Text>Mainly colour.</Text>
          <SingleDatePicker
            onChange={setDate}
            colorScheme="pink"
            popoverTitle="lololololol this is bad"
            popoverProps={{ arrowShadowColor: 'gray.700', placement: 'bottom' }}
            popoverContentProps={{ bg: 'gray.700', color: 'gray.400', padding: 4, width: '400px' }}
            popoverArrowProps={{ bg: 'gray.700' }}
            navBackButtonProps={{ colorScheme: 'teal' }}
            navForwardButtonProps={{ colorScheme: 'cyan' }}
            navCenterButtonProps={{ colorScheme: 'yellow', variant: 'solid' }}
            calendarButtonProps={{ colorScheme: 'pink', size: 'xs' }}
            footerTodayButtonProps={{ colorScheme: 'red' }}
            footerGoToButtonProps={{ colorScheme: 'green' }}
          />
        </VStack>

        <VStack mt={8} alignItems="start">
          <Heading size="lg">Default DateRangePicker</Heading>
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </VStack>

        <VStack mt={8} alignItems="start">
          <Heading size="lg">Dark mode DateRangePicker</Heading>
          <Box bg="gray.800" p={4}>
            <DarkMode>
              <DateRangePicker
                value={dateRange1}
                onChange={setDateRange1}
                inputButtonProps={{ icon: <FaRegCalendarAlt /> }}
                inputContainerProps={{
                  border: '1px',
                  bg: 'gray.800',
                  borderColor: 'gray.200',
                  borderRadius: '2px',
                  color: 'white',
                }}
                inputProps={{
                  bg: 'none',
                  borderWidth: 0,
                  width: '150px',
                  _placeholder: { color: 'gray.400' },
                  errorBorderColor: 'transparent',
                }}
                popoverContentProps={{
                  color: 'gray.100',
                }}
              />
            </DarkMode>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  )
}

export default App
