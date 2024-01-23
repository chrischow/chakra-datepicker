import { Box, Button, ChakraProvider, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import DatePicker from './components/DatePicker'

function App() {
  const [date, setDate] = useState<Date | null>(new Date())

  const [date1, setDate1] = useState<Date | null>(null)

  useEffect(() => {
    console.log('[DEMO] Selected new date:', date)
  }, [date])

  return (
    <ChakraProvider>
      <Box p={16} height="100vh" width="700px">
        <VStack alignItems="start">
          <Heading size="lg">Default DatePicker</Heading>
          <DatePicker onChange={setDate} />
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
          <DatePicker value={date1} onChange={setDate1} />
        </VStack>

        <VStack mt={8} alignItems="start">
          <Heading size="lg">Custom size and colour</Heading>
          <Text>Larger input box, larger calendar buttons</Text>
          <DatePicker
            colorScheme="teal"
            onChange={setDate}
            inputProps={{ size: 'lg' }}
            inputButtonProps={{ size: 'md' }}
            calendarButtonProps={{size: 'md'}}
          />
        </VStack>

        <VStack mt={8} alignItems="start">
          <Heading size="lg">Custom icons</Heading>
          <DatePicker
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
          <DatePicker onChange={setDate} popoverProps={{ arrowSize: 24, closeOnBlur: false, placement: 'top' }} />
        </VStack>
        <VStack mt={8} alignItems="start">
          <Heading size="lg">Customise everything</Heading>
          <Text>Mainly colour.</Text>
          <DatePicker
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
      </Box>
    </ChakraProvider>
  )
}

export default App
