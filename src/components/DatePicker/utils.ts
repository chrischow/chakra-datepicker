import { isValid, parse } from 'date-fns'
import { enGB } from 'date-fns/locale'

export const getDatesInMonth = (date: Date) => {
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth()

  let currentDate = new Date(currentYear, currentMonth, 1)
  currentDate.setHours(0, 0, 0, 0)
  const dates: Date[] = []

  while (currentDate.getMonth() === currentMonth) {
    dates.push(currentDate)
    currentDate = new Date(currentDate)
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

export const isValidDate = (dateString: string, start: number, end: number) => {
  const parsedDate = parse(dateString, 'P', new Date(), { locale: enGB })
  const year = parsedDate.getFullYear()
  if (year < start || year > end) {
    return false
  }
  return isValid(parsedDate)
}

export const getCurrentScore = (year: number) => {
  const start = Math.round((year - 1) / 20) * 20
  return {
    start: start + 1,
    end: start + 20,
  }
}
