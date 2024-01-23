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
import { DEFAULT_POPOVER_TITLE } from './constants'

export interface DatePickerProps {
  onChange: (date: Date|null) => void
  value?: Date|null
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
  colorScheme,
  validYears = { start: 1900, end: 2100 },
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
      value={value}
      onChange={onChange}
      validYears={validYears}
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
      <DateInput colorScheme={colorScheme ?? 'purple'} inputProps={inputProps} inputButtonProps={inputButtonProps} />
    </DatePickerProvider>
  )
}

export default DatePicker
