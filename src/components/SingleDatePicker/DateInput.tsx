import { CalendarIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react'
import { FormEvent } from 'react'
import CalendarView from './CalendarView'
import { useDatePicker } from './DatePickerContext'
import Footer from './Footer'

const DateInput = () => {
  const {
    // Config
    allowManualInput,
    // State
    selectedDateString,
    setSelectedDateString,
    // Utilities
    isValidDate,
    resetView,
    // Customisation
    colorScheme,
    inputButtonProps,
    inputProps,
    popoverProps: {
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
  } = useDatePicker()

  const handleSelectedDate = (event: FormEvent<HTMLInputElement>) => {
    setSelectedDateString(event.currentTarget.value)
  }

  const handleClose = () => {
    resetView()
    popoverDisclosure.onClose()
  }

  return (
    <InputGroup>
      <Input
        focusBorderColor={`${colorScheme}.500`}
        placeholder="dd/mm/yyyy"
        {...inputProps}
        onClick={() => {
          if (!allowManualInput) {
            popoverDisclosure.onToggle()
          }
        }}
        _hover={{ cursor: allowManualInput ? undefined : 'pointer' }}
        isInvalid={!isValidDate(selectedDateString)}
        value={selectedDateString}
        onChange={handleSelectedDate}
      />
      <InputRightElement width="3rem" height="100%" verticalAlign="center">
        <Popover {...popoverProps} isOpen={popoverDisclosure.isOpen} onClose={handleClose}>
          <PopoverTrigger>
            <IconButton
              variant="ghost"
              size="sm"
              aria-label="Open calendar"
              icon={<CalendarIcon />}
              {...inputButtonProps}
              onClick={popoverDisclosure.onToggle}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent {...popoverContentProps}>
              <PopoverArrow {...popoverArrowProps} />
              <PopoverCloseButton {...popoverCloseButtonProps} />
              <PopoverHeader {...popoverHeaderProps}>{popoverTitle}</PopoverHeader>
              <PopoverBody {...popoverBodyProps}>
                <CalendarView />
                <Footer />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </InputRightElement>
    </InputGroup>
  )
}

export default DateInput
