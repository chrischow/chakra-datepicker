import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { HStack, IconButton, IconButtonProps } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { useDatePicker } from '../components/SingleDatePicker/DatePickerContext'

export interface NavigatorProps {
  centerElement: ReactElement
  backIconButtonProps?: Partial<IconButtonProps>
  backIconButtonAction: () => void
  forwardIconButtonProps?: Partial<IconButtonProps>
  forwardIconButtonAction: () => void
}

const Navigator = ({
  centerElement,
  backIconButtonProps,
  backIconButtonAction,
  forwardIconButtonProps,
  forwardIconButtonAction,
}: NavigatorProps) => {
  const {
    navProps: { navBackButtonProps, navForwardButtonProps },
  } = useDatePicker()

  return (
    <HStack width="100%" justifyContent="space-between">
      <IconButton
        icon={navBackButtonProps?.icon ?? <ArrowBackIcon />}
        aria-label="Previous page"
        {...navBackButtonProps}
        {...backIconButtonProps}
        onClick={backIconButtonAction}
      />
      {centerElement}
      <IconButton
        icon={navForwardButtonProps?.icon ?? <ArrowForwardIcon />}
        aria-label="Next page"
        {...navForwardButtonProps}
        {...forwardIconButtonProps}
        onClick={forwardIconButtonAction}
      />
    </HStack>
  )
}

export default Navigator
