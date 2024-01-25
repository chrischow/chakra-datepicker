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
import {
  DEFAULT_ALLOW_MANUAL_INPUT,
  DEFAULT_COLOR_SCHEME,
  DEFAULT_GOTO_BUTTON_TEXT,
  DEFAULT_SINGLE_POPOVER_TITLE,
  DEFAULT_TODAY_BUTTON_TEXT,
  DEFAULT_VALID_YEARS,
} from '../../common/constants'
import DateInput from './DateInput'
import { DatePickerProvider } from './DatePickerContext'

export interface DatePickerProps {
  // Standard input props
  onChange: (date: Date | null) => void
  value?: Date | null

  // Config
  allowManualInput?: boolean
  validYears?: { start: number; end: number }

  // Customisation
  calendarButtonProps?: ButtonProps
  colorScheme?: string & {}
  footerGoToButtonProps?: ButtonProps
  footerGoToButtonText?: string
  footerTodayButtonProps?: ButtonProps
  footerTodayButtonText?: string
  inputButtonProps?: Partial<IconButtonProps>
  inputProps?: InputProps
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

const SingleDatePicker = ({
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
  footerGoToButtonText = DEFAULT_GOTO_BUTTON_TEXT,
  footerTodayButtonProps,
  footerTodayButtonText = DEFAULT_TODAY_BUTTON_TEXT,
  inputButtonProps,
  inputProps,
  navBackButtonProps,
  navCenterButtonProps,
  navForwardButtonProps,
  popoverArrowProps,
  popoverBodyProps,
  popoverCloseButtonProps,
  popoverContentProps,
  popoverHeaderProps,
  popoverProps,
  popoverTitle = DEFAULT_SINGLE_POPOVER_TITLE,
}: DatePickerProps) => {
  return (
    <DatePickerProvider
      onChange={onChange}
      value={value}
      allowManualInput={allowManualInput}
      validYears={validYears}
      calendarProps={{
        calendarButtonProps,
        footerGoToButtonProps,
        footerGoToButtonText,
        footerTodayButtonProps,
        footerTodayButtonText,
      }}
      colorScheme={colorScheme}
      inputButtonProps={inputButtonProps}
      inputProps={inputProps}
      navProps={{ navBackButtonProps, navForwardButtonProps, navCenterButtonProps }}
      popoverProps={{
        popoverTitle,
        popoverProps,
        popoverHeaderProps,
        popoverCloseButtonProps,
        popoverContentProps,
        popoverArrowProps,
        popoverBodyProps,
      }}
    >
      <DateInput />
    </DatePickerProvider>
  )
}

export default SingleDatePicker
