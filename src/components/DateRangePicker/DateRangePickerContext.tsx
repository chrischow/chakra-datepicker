import { UseDisclosureReturn, useDisclosure } from '@chakra-ui/react'
import { format, parse } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { DEFAULT_ALLOW_MANUAL_INPUT, DEFAULT_COLOR_SCHEME } from '../../common/constants'
import { getDatesInMonth, isValidDateInRange } from '../../common/utils'
import { CustomisationProps, Mode } from './types'

export type CalendarView = 'day' | 'month' | 'year'

export interface DateRangePickerContextProps extends CustomisationProps {
  startCalendarView: CalendarView
  setStartCalendarView: Dispatch<SetStateAction<CalendarView>>
  endCalendarView: CalendarView
  setEndCalendarView: Dispatch<SetStateAction<CalendarView>>
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
  resetView: (mode: Mode) => void
  validYears: { start: number; end: number }
  allowManualInput: boolean
  isValidDate: (dateString: string) => boolean
  popoverDisclosure: UseDisclosureReturn
}

const starterDate = new Date()
starterDate.setHours(0, 0, 0, 0)

const DateRangePickerContext = createContext<DateRangePickerContextProps>({
  startCalendarView: 'day',
  setStartCalendarView: () => {},
  endCalendarView: 'day',
  setEndCalendarView: () => {},
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
  allowManualInput: DEFAULT_ALLOW_MANUAL_INPUT,
  isValidDate: () => true,
  colorScheme: DEFAULT_COLOR_SCHEME,
  inputProps: {},
  inputButtonProps: {},
  popoverComponentProps: {},
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
  allowManualInput: boolean
  validYears: { start: number; end: number }
}

export const DateRangePickerProvider = ({
  children,
  value,
  onChange,
  allowManualInput,
  colorScheme,
  validYears,
  inputProps = {},
  inputButtonProps = {},
  navProps = {},
  calendarProps = {},
  popoverComponentProps = {},
}: DateRangePickerProviderProps) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date()
  tomorrow.setHours(23, 59, 59, 999)
  const initialStartDate = value ? value[0] ?? today : today
  const initialEndDate = value ? value[0] ?? today : today
  const [startCalendarView, setStartCalendarView] = useState<CalendarView>('day')
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialStartDate)
  const [displayStartDate, setDisplayStartDate] = useState<Date>(initialStartDate)
  const [selectedStartDateString, setSelectedStartDateString] = useState<string>(
    value ? (value[0] ? format(value[0], 'dd/MM/yyyy') : '') : format(today, 'dd/MM/yyyy'),
  )

  const [endCalendarView, setEndCalendarView] = useState<CalendarView>('day')
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(initialEndDate)
  const [displayEndDate, setDisplayEndDate] = useState<Date>(initialEndDate)
  const [selectedEndDateString, setSelectedEndDateString] = useState<string>(
    value ? (value[1] ? format(value[1], 'dd/MM/yyyy') : '') : format(today, 'dd/MM/yyyy'),
  )

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
        resetView('start')
      }
      if (value[1]) {
        setSelectedEndDateString(format(value[1], 'dd/MM/yyyy'))
        resetView('end')
      }
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
    setStartCalendarView('day')
  }

  const resetView = (mode: Mode) => {
    setDisplayStartDate(selectedStartDate ?? today)
    if (mode === 'start') {
      setStartCalendarView('day')
    } else {
      setEndCalendarView('day')
    }
  }

  return (
    <DateRangePickerContext.Provider
      value={{
        startCalendarView,
        setStartCalendarView,
        endCalendarView,
        setEndCalendarView,
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
        allowManualInput,
        isValidDate,
        colorScheme,
        inputProps,
        inputButtonProps,
        popoverComponentProps,
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
