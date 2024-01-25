import { UseDisclosureReturn, useDisclosure } from '@chakra-ui/react'
import { format, parse } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { DEFAULT_ALLOW_MANUAL_INPUT, DEFAULT_COLOR_SCHEME, DEFAULT_VALID_YEARS } from '../../common/constants'
import { getDatesInMonth, isValidDateInRange } from '../../common/utils'
import { CustomisationProps, Mode } from './types'

export type CalendarView = 'day' | 'month' | 'year'

export interface DateRangePickerContextProps extends CustomisationProps {
  // Config
  allowManualInput: boolean
  validYears: { start: number; end: number }

  // Start date state
  startCalendarView: CalendarView
  setStartCalendarView: Dispatch<SetStateAction<CalendarView>>
  selectedStartDate: Date | null
  setSelectedStartDate: Dispatch<SetStateAction<Date | null>>
  selectedStartDateString: string
  setSelectedStartDateString: Dispatch<SetStateAction<string>>
  displayStartDate: Date
  setDisplayStartDate: Dispatch<SetStateAction<Date>>

  // End date state
  endCalendarView: CalendarView
  setEndCalendarView: Dispatch<SetStateAction<CalendarView>>
  selectedEndDate: Date | null
  setSelectedEndDate: Dispatch<SetStateAction<Date | null>>
  selectedEndDateString: string
  setSelectedEndDateString: Dispatch<SetStateAction<string>>
  displayEndDate: Date
  setDisplayEndDate: Dispatch<SetStateAction<Date>>

  // Utilities
  getDatesInMonth: (date: Date) => Date[]
  isValidDate: (dateString: string) => boolean
  resetToToday: (mode: Mode) => void
  resetView: (mode: Mode) => void

  // Behaviour
  popoverDisclosure: UseDisclosureReturn
}

const starterDate = new Date()
starterDate.setHours(0, 0, 0, 0)

const DateRangePickerContext = createContext<DateRangePickerContextProps>({
  // Config
  allowManualInput: DEFAULT_ALLOW_MANUAL_INPUT,
  validYears: DEFAULT_VALID_YEARS,

  // Start date state
  startCalendarView: 'day',
  setStartCalendarView: () => {},
  selectedStartDate: starterDate,
  setSelectedStartDate: () => {},
  selectedStartDateString: '',
  setSelectedStartDateString: () => {},
  displayStartDate: starterDate,
  setDisplayStartDate: () => {},

  // End date state
  endCalendarView: 'day',
  setEndCalendarView: () => {},
  selectedEndDate: starterDate,
  setSelectedEndDate: () => {},
  selectedEndDateString: '',
  setSelectedEndDateString: () => {},
  displayEndDate: starterDate,
  setDisplayEndDate: () => {},

  // Utilities
  getDatesInMonth: () => [],
  isValidDate: () => true,
  resetToToday: () => {},
  resetView: () => {},

  // Customisation
  calendarProps: {},
  colorScheme: DEFAULT_COLOR_SCHEME,
  inputButtonProps: {},
  inputContainerProps: {},
  inputProps: {},
  navProps: {},
  popoverComponentProps: {},
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
  inputContainerProps = {},
  inputProps = {},
  navProps = {},
  popoverComponentProps = {},
}: DateRangePickerProviderProps) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date()
  tomorrow.setHours(23, 59, 59, 999)
  const initialStartDate = value ? value[0] : today
  const initialEndDate = value ? value[0] : today
  const [startCalendarView, setStartCalendarView] = useState<CalendarView>('day')
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialStartDate)
  const [displayStartDate, setDisplayStartDate] = useState<Date>(initialStartDate ?? today)
  const [selectedStartDateString, setSelectedStartDateString] = useState<string>(
    value ? (value[0] ? format(value[0], 'dd/MM/yyyy') : '') : format(today, 'dd/MM/yyyy'),
  )

  const [endCalendarView, setEndCalendarView] = useState<CalendarView>('day')
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(initialEndDate)
  const [displayEndDate, setDisplayEndDate] = useState<Date>(initialEndDate ?? today)
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

  const resetToToday = (mode: Mode) => {
    if (mode === 'start') {
      setSelectedStartDate(today)
      setSelectedStartDateString(format(today, 'dd/MM/yyyy'))
      setDisplayStartDate(today)
      setStartCalendarView('day')
    } else {
      setSelectedEndDate(today)
      setSelectedEndDateString(format(today, 'dd/MM/yyyy'))
      setDisplayEndDate(today)
      setEndCalendarView('day')
    }
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
        // Config
        allowManualInput,
        validYears,

        // Start date state
        startCalendarView,
        setStartCalendarView,
        selectedStartDate,
        setSelectedStartDate,
        selectedStartDateString,
        setSelectedStartDateString,
        displayStartDate,
        setDisplayStartDate,

        // End date state
        endCalendarView,
        setEndCalendarView,
        selectedEndDate,
        setSelectedEndDate,
        selectedEndDateString,
        setSelectedEndDateString,
        displayEndDate,
        setDisplayEndDate,

        // Utilities
        getDatesInMonth,
        isValidDate,
        resetToToday,
        resetView,

        // Customisation
        calendarProps,
        colorScheme,
        inputButtonProps,
        inputContainerProps,
        inputProps,
        navProps,
        popoverComponentProps,
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
