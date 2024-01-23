import {
  ButtonProps,
  IconButtonProps,
  InputProps,
  PopoverArrowProps,
  PopoverBodyProps,
  PopoverCloseButtonProps,
  PopoverContentProps,
  PopoverHeaderProps,
  PopoverProps,
} from '@chakra-ui/react'
import DateInput from './DateInput'
import { DatePickerProvider } from './DatePickerContext'
import { DEFAULT_COLOR_SCHEME, DEFAULT_POPOVER_TITLE, DEFAULT_VALID_YEARS } from './constants'

export interface DatePickerProps {
  onChange: (date: Date | null) => void
  value?: Date | null
  colorScheme?: string & {}
  validYears?: { start: number; end: number }
  inputProps?: InputProps
  inputButtonProps?: Partial<IconButtonProps>
  popoverTitle?: string
  popoverProps?: PopoverProps
  popoverHeaderProps?: PopoverHeaderProps
  popoverCloseButtonProps?: PopoverCloseButtonProps
  popoverContentProps?: PopoverContentProps
  popoverArrowProps?: PopoverArrowProps
  popoverBodyProps?: PopoverBodyProps
  navBackButtonProps?: Partial<IconButtonProps>
  navForwardButtonProps?: Partial<IconButtonProps>
  navCenterButtonProps?: ButtonProps
  calendarButtonProps?: ButtonProps
  footerTodayButtonProps?: ButtonProps
  footerGoToButtonProps?: ButtonProps
}

const DatePicker = ({
  onChange,
  value,
  colorScheme = DEFAULT_COLOR_SCHEME,
  validYears = DEFAULT_VALID_YEARS,
  inputProps,
  inputButtonProps,
  popoverTitle = DEFAULT_POPOVER_TITLE,
  popoverProps,
  popoverHeaderProps,
  popoverCloseButtonProps,
  popoverContentProps,
  popoverArrowProps,
  popoverBodyProps,
  navBackButtonProps,
  navForwardButtonProps,
  navCenterButtonProps,
  calendarButtonProps,
  footerTodayButtonProps,
  footerGoToButtonProps,
}: DatePickerProps) => {
  return (
    <DatePickerProvider
      onChange={onChange}
      value={value}
      colorScheme={colorScheme}
      validYears={validYears}
      inputProps={inputProps}
      inputButtonProps={inputButtonProps}
      popoverProps={{
        popoverTitle,
        popoverProps,
        popoverHeaderProps,
        popoverCloseButtonProps,
        popoverContentProps,
        popoverArrowProps,
        popoverBodyProps,
      }}
      navProps={{ navBackButtonProps, navForwardButtonProps, navCenterButtonProps }}
      calendarProps={{ calendarButtonProps, footerTodayButtonProps, footerGoToButtonProps }}
    >
      <DateInput  />
    </DatePickerProvider>
  )
}

export default DatePicker
