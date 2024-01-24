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
import { format, parse } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { getDatesInMonth, isValidDateInRange } from '../../common/utils'
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

export interface DateRangePickerContextProps extends CustomisationProps {
  calendarView: CalendarView
  setCalendarView: Dispatch<SetStateAction<CalendarView>>
  selectedStartDate: Date | null
  setSelectedStartDate: Dispatch<SetStateAction<Date | null>>
  selectedStartDateString: string
  setSelectedStartDateString: Dispatch<SetStateAction<string>>
  displayStartDate: Date
  setDisplayStartDate: Dispatch<SetStateAction<Date>>
  selectedEndDate: Date | null
  setSelectedEndDate: Dispatch<SetStateAction<Date | null>>
  selectedEndDateString: string
  setSelectedEndDateString: Dispatch<SetStateAction<string>>
  displayEndDate: Date
  setDisplayEndDate: Dispatch<SetStateAction<Date>>
  getDatesInMonth: (date: Date) => Date[]
  resetToToday: () => void
  resetView: () => void
  validYears: { start: number; end: number }
  isValidDate: (dateString: string) => boolean
  popoverDisclosure: UseDisclosureReturn
}

const starterDate = new Date()
starterDate.setHours(0, 0, 0, 0)

const DateRangePickerContext = createContext<DateRangePickerContextProps>({
  calendarView: 'day',
  setCalendarView: () => {},
  selectedStartDate: starterDate,
  setSelectedStartDate: () => {},
  selectedStartDateString: '',
  setSelectedStartDateString: () => {},
  displayStartDate: starterDate,
  setDisplayStartDate: () => {},
  selectedEndDate: starterDate,
  setSelectedEndDate: () => {},
  selectedEndDateString: '',
  setSelectedEndDateString: () => {},
  displayEndDate: starterDate,
  setDisplayEndDate: () => {},
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

export interface DateRangePickerProviderProps extends CustomisationProps {
  children: ReactNode
  onChange: (dateRange: [Date | null, Date | null]) => void
  value?: [Date | null, Date | null]
  validYears: { start: number; end: number }
}

export const DateRangePickerProvider = ({
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
}: DateRangePickerProviderProps) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date()
  tomorrow.setHours(23, 59, 59, 999)
  const initialStartDate = value ? value[0] ?? today : today
  const initialEndDate = value ? value[0] ?? today : today
  const [calendarView, setCalendarView] = useState<CalendarView>('day')
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialStartDate)
  const [selectedStartDateString, setSelectedStartDateString] = useState<string>(
    value ? (value[0] ? format(value[0], 'dd/MM/yyyy') : '') : format(today, 'dd/MM/yyyy'),
  )
  const [displayStartDate, setDisplayStartDate] = useState<Date>(initialStartDate)

  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(initialEndDate)
  const [selectedEndDateString, setSelectedEndDateString] = useState<string>(
    value ? (value[0] ? format(value[0], 'dd/MM/yyyy') : '') : format(today, 'dd/MM/yyyy'),
  )
  const [displayEndDate, setDisplayEndDate] = useState<Date>(initialEndDate)

  const popoverDisclosure = useDisclosure()
  const isSelfManaged = value !== undefined

  const isValidDate = (dateString: string) => {
    return isValidDateInRange(dateString, validYears.start, validYears.end)
  }

  useEffect(() => {
    if (isValidDate(selectedStartDateString)) {
      const date = parse(selectedStartDateString, 'P', new Date(), { locale: enGB })
      date.setHours(0, 0, 0, 0)
      setSelectedStartDate(date)
      setDisplayStartDate(date)
    } else {
      setSelectedStartDate(null)
    }
  }, [selectedStartDateString])

  useEffect(() => {
    if (isValidDate(selectedEndDateString)) {
      const date = parse(selectedEndDateString, 'P', new Date(), { locale: enGB })
      date.setHours(0, 0, 0, 0)
      setSelectedEndDate(date)
      setDisplayEndDate(date)
    } else {
      setSelectedEndDate(null)
    }
  }, [selectedEndDateString])

  useEffect(() => {
    if (isSelfManaged && value) {
      if (value[0]) {
        setSelectedStartDateString(format(value[0], 'dd/MM/yyyy'))
      }
      if (value[1]) {
        setSelectedStartDateString(format(value[1], 'dd/MM/yyyy'))
      }
      resetView()
    }
  }, [value])

  // Run user-provided callback
  useEffect(() => {
    onChange([selectedStartDate, selectedEndDate])
  }, [selectedStartDate, selectedEndDate])

  const resetToToday = () => {
    setSelectedStartDate(today)
    setSelectedStartDateString(format(today, 'dd/MM/yyyy'))
    setDisplayStartDate(today)
    setCalendarView('day')
  }

  const resetView = () => {
    setDisplayStartDate(selectedStartDate ?? today)
    setCalendarView('day')
  }

  return (
    <DateRangePickerContext.Provider
      value={{
        calendarView,
        setCalendarView,
        selectedStartDate,
        setSelectedStartDate,
        selectedStartDateString,
        setSelectedStartDateString,
        displayStartDate,
        setDisplayStartDate,
        selectedEndDate,
        setSelectedEndDate,
        selectedEndDateString,
        setSelectedEndDateString,
        displayEndDate,
        setDisplayEndDate,
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
    </DateRangePickerContext.Provider>
  )
}

export const useDateRangePicker = () => {
  return useContext(DateRangePickerContext)
}
