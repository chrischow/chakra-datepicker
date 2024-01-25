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
  StackProps,
} from '@chakra-ui/react'
import {
  DEFAULT_ALLOW_MANUAL_INPUT,
  DEFAULT_COLOR_SCHEME,
  DEFAULT_RANGE_POPOVER_TITLE,
  DEFAULT_VALID_YEARS,
} from '../../common/constants'
import DateRangeInput from './DateRangeInput'
import { DateRangePickerProvider } from './DateRangePickerContext'

export interface DateRangePickerProps {
  // Standard input props
  onChange: (dateRange: [Date | null, Date | null]) => void
  value?: [Date | null, Date | null]
  // Config
  allowManualInput?: boolean
  validYears?: { start: number; end: number }
  // Customisation
  calendarButtonProps?: ButtonProps
  colorScheme?: string & {}
  inputButtonProps?: Partial<IconButtonProps>
  inputContainerProps?: StackProps
  inputProps?: InputProps
  footerGoToButtonProps?: ButtonProps
  footerTodayButtonProps?: ButtonProps
  navBackButtonProps?: Partial<IconButtonProps>
  navCenterButtonProps?: ButtonProps
  navForwardButtonProps?: Partial<IconButtonProps>
  popoverArrowProps?: PopoverArrowProps
  popoverBodyProps?: PopoverBodyProps
  popoverCloseButtonProps?: PopoverCloseButtonProps
  popoverContentProps?: PopoverContentProps
  popoverHeaderProps?: PopoverHeaderProps
  popoverProps?: PopoverProps
  popoverTitle?: string
}

const DateRangePicker = ({
  // Standard input props
  onChange,
  value,

  // Config
  allowManualInput = DEFAULT_ALLOW_MANUAL_INPUT,
  validYears = DEFAULT_VALID_YEARS,

  // Customisation
  calendarButtonProps,
  colorScheme = DEFAULT_COLOR_SCHEME,
  footerGoToButtonProps,
  footerTodayButtonProps,
  inputProps,
  inputButtonProps,
  inputContainerProps,
  navBackButtonProps,
  navCenterButtonProps,
  navForwardButtonProps,
  popoverArrowProps,
  popoverBodyProps,
  popoverCloseButtonProps,
  popoverContentProps,
  popoverHeaderProps,
  popoverProps,
  popoverTitle = DEFAULT_RANGE_POPOVER_TITLE,
}: DateRangePickerProps) => {
  return (
    <DateRangePickerProvider
      onChange={onChange}
      value={value}
      allowManualInput={allowManualInput}
      validYears={validYears}
      calendarProps={{ calendarButtonProps, footerTodayButtonProps, footerGoToButtonProps }}
      colorScheme={colorScheme}
      inputButtonProps={inputButtonProps}
      inputContainerProps={inputContainerProps}
      inputProps={inputProps}
      navProps={{ navBackButtonProps, navForwardButtonProps, navCenterButtonProps }}
      popoverComponentProps={{
        popoverTitle,
        popoverProps,
        popoverHeaderProps,
        popoverCloseButtonProps,
        popoverContentProps,
        popoverArrowProps,
        popoverBodyProps,
      }}
    >
      <DateRangeInput />
    </DateRangePickerProvider>
  )
}

export default DateRangePicker
