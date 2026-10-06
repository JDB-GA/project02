import { MINIMUM_AGE_YEARS } from '../constants/kyc.constants'

const parseLocalDate = (value: string): Date => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year ?? 0, (month ?? 1) - 1, day ?? 1)
}

const startOfToday = (): Date => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export const isAdult = (dateOfBirth: string): boolean => {
  const adultFrom = parseLocalDate(dateOfBirth)
  adultFrom.setFullYear(adultFrom.getFullYear() + MINIMUM_AGE_YEARS)
  return adultFrom <= startOfToday()
}

export const isFutureDate = (value: string): boolean => parseLocalDate(value) > startOfToday()

const toIsoDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${String(date.getFullYear())}-${month}-${day}`
}

export const todayIsoDate = (): string => toIsoDate(startOfToday())

export const tomorrowIsoDate = (): string => {
  const tomorrow = startOfToday()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return toIsoDate(tomorrow)
}
