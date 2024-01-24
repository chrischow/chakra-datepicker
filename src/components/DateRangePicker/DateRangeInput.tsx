import { CalendarIcon } from '@chakra-ui/icons'
import {
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useDateRangePicker } from './DateRangePickerContext'
import CalendarView from './CalendarView'
import { FormEvent } from 'react'

const DateRangeInput = () => {
  const {
    // Config
    allowManualInput,

    // Start date state
    selectedStartDate,
    selectedStartDateString,
    setSelectedStartDateString,

    // End date state
    selectedEndDate,
    selectedEndDateString,
    setSelectedEndDateString,

    // Utilities
    isValidDate,
    resetView,

    // Customisation
    colorScheme,
    inputButtonProps,
    inputProps,
    popoverComponentProps: {
      popoverTitle,
      popoverProps,
      popoverHeaderProps,
      popoverCloseButtonProps,
      popoverContentProps,
      popoverArrowProps,
      popoverBodyProps,
    },

    // Behaviour
    popoverDisclosure,
  } = useDateRangePicker()

  const handleClose = () => {
    resetView('start')
    resetView('end')
    popoverDisclosure.onClose()
  }

  const handleSelectedStartDate = (event: FormEvent<HTMLInputElement>) => {
    setSelectedStartDateString(event.currentTarget.value)
  }

  const handleSelectedEndDate = (event: FormEvent<HTMLInputElement>) => {
    setSelectedEndDateString(event.currentTarget.value)
  }

  const isInvalidRange =
    selectedStartDate && selectedEndDate ? selectedStartDate.getTime() > selectedEndDate.getTime() : false

  return (
    <HStack alignItems="center" pr={2} gap={2} border="1px" borderColor="gray.200" bg="gray.200" borderRadius={6}>
      <Input
        textAlign="center"
        placeholder="dd/mm/yyyy"
        bg="white"
        focusBorderColor={`${colorScheme}.500`}
        {...inputProps}
        onClick={() => {
          if (!allowManualInput) {
            popoverDisclosure.onToggle()
          }
        }}
        _hover={{ cursor: allowManualInput ? undefined : 'pointer' }}
        isInvalid={!isValidDate(selectedStartDateString) || isInvalidRange}
        value={selectedStartDateString}
        onChange={handleSelectedStartDate}
      />
      <Text>to</Text>
      <Input
        textAlign="center"
        placeholder="dd/mm/yyyy"
        bg="white"
        focusBorderColor={`${colorScheme}.500`}
        {...inputProps}
        onClick={() => {
          if (!allowManualInput) {
            popoverDisclosure.onToggle()
          }
        }}
        _hover={{ cursor: allowManualInput ? undefined : 'pointer' }}
        isInvalid={!isValidDate(selectedEndDateString) || isInvalidRange}
        value={selectedEndDateString}
        onChange={handleSelectedEndDate}
      />
      <Popover {...popoverProps} isOpen={popoverDisclosure.isOpen} onClose={handleClose}>
        <PopoverTrigger>
          <IconButton
            size="sm"
            icon={<CalendarIcon />}
            variant="ghost"
            aria-label="Open calendar"
            {...inputButtonProps}
            onClick={popoverDisclosure.onToggle}
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent width="100%" {...popoverContentProps}>
            <PopoverArrow {...popoverArrowProps} />
            <PopoverCloseButton {...popoverCloseButtonProps} />
            <PopoverHeader {...popoverHeaderProps}>{popoverTitle}</PopoverHeader>
            <PopoverBody {...popoverBodyProps}>
              <HStack gap={12} alignItems="start">
                <VStack width="350px">
                  <CalendarView mode="start" />
                </VStack>
                <VStack width="350px">
                  <CalendarView mode="end" />
                </VStack>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </HStack>
  )
}

export default DateRangeInput
