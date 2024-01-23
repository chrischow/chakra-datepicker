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
import { DEFAULT_COLOR_SCHEME } from '../../common/constants'

export type CalendarView = 'day' | 'month' | 'year'

interface CustomisationProps {
  colorScheme?: string & {}
  inputProps?: InputProps
  inputButtonProps?: Partial<IconButtonProps>
  popoverProps: {
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

export interface DatePickerContextProps extends CustomisationProps {
  calendarView: CalendarView
  setCalendarView: Dispatch<SetStateAction<CalendarView>>
  selectedDate: Date | null
  setSelectedDate: Dispatch<SetStateAction<Date | null>>
  selectedDateString: string
  setSelectedDateString: Dispatch<SetStateAction<string>>
  displayDate: Date
  setDisplayDate: Dispatch<SetStateAction<Date>>
  getDatesInMonth: (date: Date) => Date[]
  resetToToday: () => void
  resetView: () => void
  validYears: { start: number; end: number }
  isValidDate: (dateString: string) => boolean
  popoverDisclosure: UseDisclosureReturn
}

const starterDate = new Date()
starterDate.setHours(0, 0, 0, 0)

const DatePickerContext = createContext<DatePickerContextProps>({
  calendarView: 'day',
  setCalendarView: () => {},
  selectedDate: starterDate,
  setSelectedDate: () => {},
  selectedDateString: '',
  setSelectedDateString: () => {},
  displayDate: starterDate,
  setDisplayDate: () => {},
  getDatesInMonth,
  resetToToday: () => {},
  resetView: () => {},
  validYears: { start: 1900, end: 2100 },
  isValidDate: () => true,
  colorScheme: DEFAULT_COLOR_SCHEME,
  inputProps: {},
  inputButtonProps: {},
  popoverProps: {},
  navProps: {},
  calendarProps: {},
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
  validYears: { start: number; end: number }
}

export const DatePickerProvider = ({
  children,
  value,
  onChange,
  colorScheme,
  validYears,
  inputProps = {},
  inputButtonProps = {},
  navProps = {},
  calendarProps = {},
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
      if (value) {
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

  const isValidDate = (dateString: string) => {
    return isValidDateInRange(dateString, validYears.start, validYears.end)
  }

  return (
    <DatePickerContext.Provider
      value={{
        calendarView,
        setCalendarView,
        selectedDate,
        setSelectedDate,
        selectedDateString,
        setSelectedDateString,
        displayDate,
        setDisplayDate,
        getDatesInMonth,
        resetToToday,
        resetView,
        validYears,
        isValidDate,
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
