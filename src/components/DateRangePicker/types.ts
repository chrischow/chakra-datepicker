import {
  InputProps,
  IconButtonProps,
  PopoverProps,
  PopoverHeaderProps,
  PopoverCloseButtonProps,
  PopoverContentProps,
  PopoverArrowProps,
  PopoverBodyProps,
  ButtonProps,
  StackProps,
} from '@chakra-ui/react'

export interface CustomisationProps {
  calendarProps: {
    calendarButtonProps?: ButtonProps
    footerTodayButtonProps?: ButtonProps
    footerClearButtonText?: string
    footerClearButtonProps?: ButtonProps
    footerGoToButtonText?: string
    footerGoToButtonProps?: ButtonProps
    footerTodayButtonText?: string
  }
  colorScheme?: string & {}
  inputButtonProps?: Partial<IconButtonProps>
  inputContainerProps?: StackProps
  inputProps?: InputProps
  navProps: {
    navBackButtonProps?: Partial<IconButtonProps>
    navForwardButtonProps?: Partial<IconButtonProps>
    navCenterButtonProps?: ButtonProps
  }
  popoverComponentProps: {
    popoverTitle?: string
    popoverProps?: PopoverProps
    popoverHeaderProps?: PopoverHeaderProps
    popoverCloseButtonProps?: PopoverCloseButtonProps
    popoverContentProps?: PopoverContentProps
    popoverArrowProps?: PopoverArrowProps
    popoverBodyProps?: PopoverBodyProps
  }
}

export type Mode = 'start' | 'end'
