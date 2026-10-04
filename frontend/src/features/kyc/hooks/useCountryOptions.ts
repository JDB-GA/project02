import { useMemo } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { getCountryOptions } from '../utils/get-country-options'

export function useCountryOptions() {
  const { language } = useLanguage()
  return useMemo(() => getCountryOptions(language), [language])
}
