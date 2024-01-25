import { format, parse } from 'date-fns'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { getDatesInMonth, isValidDateInRange } from '../../common/utils'
import { enGB } from 'date-fns/locale'
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
  UseDisclosureReturn,
  useDisclosure,
} from '@chakra-ui/react'
import { DEFAULT_ALLOW_MANUAL_INPUT, DEFAULT_COLOR_SCHEME, DEFAULT_VALID_YEARS } from '../../common/constants'

export type CalendarView = 'day' | 'month' | 'year'

interface CustomisationProps {
  calendarProps: {
    calendarButtonProps?: ButtonProps
    footerClearButtonProps?: ButtonProps
    footerClearButtonText?: string
    footerGoToButtonProps?: ButtonProps
    footerGoToButtonText?: string
    footerTodayButtonProps?: ButtonProps
    footerTodayButtonText?: string
  }
  colorScheme?: string & {}
  inputButtonProps?: Partial<IconButtonProps>
  inputProps?: InputProps
  navProps: {
    navBackButtonProps?: Partial<IconButtonProps>
    navCenterButtonProps?: ButtonProps
    navForwardButtonProps?: Partial<IconButtonProps>
  }
  popoverProps: {
    popoverArrowProps?: PopoverArrowProps
    popoverBodyProps?: PopoverBodyProps
    popoverCloseButtonProps?: PopoverCloseButtonProps
    popoverContentProps?: PopoverContentProps
    popoverHeaderProps?: PopoverHeaderProps
    popoverProps?: PopoverProps
    popoverTitle?: string
  }
}

export interface DatePickerContextProps extends CustomisationProps {
  // Config
  allowManualInput: boolean
  validYears: { start: number; end: number }
  // State
  calendarView: CalendarView
  setCalendarView: Dispatch<SetStateAction<CalendarView>>
  selectedDate: Date | null
  setSelectedDate: Dispatch<SetStateAction<Date | null>>
  selectedDateString: string
  setSelectedDateString: Dispatch<SetStateAction<string>>
  displayDate: Date
  setDisplayDate: Dispatch<SetStateAction<Date>>
  // Utilities
  clearDate: () => void
  getDatesInMonth: (date: Date) => Date[]
  isValidDate: (dateString: string) => boolean
  resetToToday: () => void
  resetView: () => void
  // Behaviour
  popoverDisclosure: UseDisclosureReturn
}

const starterDate = new Date()
starterDate.setHours(0, 0, 0, 0)

const DatePickerContext = createContext<DatePickerContextProps>({
  // Config
  allowManualInput: DEFAULT_ALLOW_MANUAL_INPUT,
  validYears: DEFAULT_VALID_YEARS,
  // State
  calendarView: 'day',
  setCalendarView: () => {},
  selectedDate: starterDate,
  setSelectedDate: () => {},
  selectedDateString: '',
  setSelectedDateString: () => {},
  displayDate: starterDate,
  setDisplayDate: () => {},
  // Utilities
  clearDate: () => {},
  getDatesInMonth: () => [],
  isValidDate: () => true,
  resetToToday: () => {},
  resetView: () => {},
  // Customisation
  calendarProps: {},
  colorScheme: DEFAULT_COLOR_SCHEME,
  inputButtonProps: {},
  inputProps: {},
  navProps: {},
  popoverProps: {},
  // Behaviour
  popoverDisclosure: {
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
    onToggle: () => {},
    isControlled: false,
    getButtonProps: () => {},
    getDisclosureProps: () => {},
  },
})

export interface DatePickerProviderProps extends CustomisationProps {
  children: ReactNode
  onChange: (date: Date | null) => void
  value?: Date | null
  allowManualInput: boolean
  validYears: { start: number; end: number }
}

export const DatePickerProvider = ({
  // Standard input props
  children,
  value,
  onChange,
  // Config
  allowManualInput,
  validYears,
  // Customisation
  calendarProps = {},
  colorScheme,
  inputButtonProps = {},
  inputProps = {},
  navProps = {},
  popoverProps = {},
}: DatePickerProviderProps) => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const [calendarView, setCalendarView] = useState<CalendarView>('day')
  const [selectedDate, setSelectedDate] = useState<Date | null>(value !== undefined ? value : now)
  const [selectedDateString, setSelectedDateString] = useState<string>(
    value !== undefined ? (value ? format(value, 'dd/MM/yyyy') : '') : format(now, 'dd/MM/yyyy'),
  )
  const [displayDate, setDisplayDate] = useState<Date>(value ?? now)
  const popoverDisclosure = useDisclosure()

  const isSelfManaged = value !== undefined

  useEffect(() => {
    if (isValidDateInRange(selectedDateString, validYears.start, validYears.end)) {
      const date = parse(selectedDateString, 'P', new Date(), { locale: enGB })
      date.setHours(0, 0, 0, 0)
      setSelectedDate(date)
      setDisplayDate(date)
    } else {
      setSelectedDate(null)
    }
  }, [selectedDateString])

  useEffect(() => {
    if (isSelfManaged) {
      // Condition to break loop
      if (value && value.getTime() !== selectedDate?.getTime()) {
        console.log('running')
        setSelectedDateString(format(value, 'dd/MM/yyyy'))
        resetView()
      }
    }
  }, [value])

  // Run user-provided callback
  useEffect(() => {
    onChange(selectedDate)
  }, [selectedDate])

  const resetToToday = () => {
    setSelectedDate(now)
    setSelectedDateString(format(now, 'dd/MM/yyyy'))
    setDisplayDate(now)
    setCalendarView('day')
  }

  const resetView = () => {
    setDisplayDate(selectedDate ?? now)
    setCalendarView('day')
  }

  const clearDate = () => {
    setDisplayDate(now)
    setSelectedDate(null)
    setSelectedDateString('')
    setCalendarView('day')
  }

  const isValidDate = (dateString: string) => {
    return isValidDateInRange(dateString, validYears.start, validYears.end)
  }

  return (
    <DatePickerContext.Provider
      value={{
        // Config
        allowManualInput,
        validYears,

        // State
        calendarView,
        setCalendarView,
        selectedDate,
        setSelectedDate,
        selectedDateString,
        setSelectedDateString,
        displayDate,
        setDisplayDate,

        // Utilities
        clearDate,
        getDatesInMonth,
        isValidDate,
        resetToToday,
        resetView,

        // Customisation
        colorScheme,
        inputProps,
        inputButtonProps,
        popoverProps,
        navProps,
        calendarProps,
        popoverDisclosure,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  )
}

export const useDatePicker = () => {
  return useContext(DatePickerContext)
}
