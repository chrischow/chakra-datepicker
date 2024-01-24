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
} from '@chakra-ui/react'

export interface CustomisationProps {
  colorScheme?: string & {}
  inputProps?: InputProps
  inputButtonProps?: Partial<IconButtonProps>
  popoverComponentProps: {
    popoverTitle?: string
    popoverProps?: PopoverProps
    popoverHeaderProps?: PopoverHeaderProps
    popoverCloseButtonProps?: PopoverCloseButtonProps
    popoverContentProps?: PopoverContentProps
    popoverArrowProps?: PopoverArrowProps
    popoverBodyProps?: PopoverBodyProps
  }
  navProps: {
    navBackButtonProps?: Partial<IconButtonProps>
    navForwardButtonProps?: Partial<IconButtonProps>
    navCenterButtonProps?: ButtonProps
  }
  calendarProps: {
    calendarButtonProps?: ButtonProps
    footerTodayButtonProps?: ButtonProps
    footerGoToButtonProps?: ButtonProps
  }
}

export type Mode = 'start' | 'end'
