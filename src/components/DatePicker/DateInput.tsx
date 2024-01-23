import {
  IconButton,
  IconButtonProps,
  Input,
  InputGroup,
  InputProps,
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
import { CalendarIcon } from '@chakra-ui/icons'
import { isValidDate } from './utils'

export interface DateInputProps {
  colorScheme: string & {}
  inputProps?: InputProps
  inputButtonProps?: Partial<IconButtonProps>
}

const DateInput = ({ colorScheme, inputProps, inputButtonProps }: DateInputProps) => {
  const {
    selectedDateString,
    setSelectedDateString,
    resetView,
    popoverProps: {
      popoverTitle,
      popoverProps,
      popoverHeaderProps,
      popoverCloseButtonProps,
      popoverContentProps,
      popoverArrowProps,
      popoverBodyProps,
    },
    popoverDisclosure,
    validYears,
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
        placeholder='dd/mm/yyyy'
        {...inputProps}
        isInvalid={!isValidDate(selectedDateString, validYears.start, validYears.end)}
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
                <CalendarView colorScheme={colorScheme} />
                <Footer colorScheme={colorScheme} />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </InputRightElement>
    </InputGroup>
  )
}

export default DateInput
