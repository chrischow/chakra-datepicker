import { InputProps, IconButtonProps, PopoverProps, PopoverHeaderProps, PopoverCloseButtonProps, PopoverContentProps, PopoverArrowProps, PopoverBodyProps, ButtonProps } from '@chakra-ui/react'
import { DEFAULT_COLOR_SCHEME, DEFAULT_RANGE_POPOVER_TITLE, DEFAULT_VALID_YEARS } from '../../common/constants'
import DateRangeInput from './DateRangeInput'
import { DateRangePickerProvider } from './DateRangePickerContext'
import { CustomisationProps } from './types'

export interface DatePickerProps extends CustomisationProps {
  onChange: (dateRange: [Date | null, Date | null]) => void
  value?: [Date | null, Date | null]
  validYears?: { start: number; end: number }
  colorScheme?: string & {}
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

const DateRangePicker = ({
  onChange,
  value,
  colorScheme = DEFAULT_COLOR_SCHEME,
  validYears = DEFAULT_VALID_YEARS,
  inputProps,
  inputButtonProps,
  popoverTitle = DEFAULT_RANGE_POPOVER_TITLE,
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
    <DateRangePickerProvider
      onChange={onChange}
      value={value}
      colorScheme={colorScheme}
      validYears={validYears}
      inputProps={inputProps}
      inputButtonProps={inputButtonProps}
      popoverComponentProps={{
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
      <DateRangeInput />
    </DateRangePickerProvider>
  )
}

export default DateRangePicker
