import type { Language } from '@/i18n/i18n.types'
import { COUNTRY_CODES } from '../constants/countries'
import type { CountryOption } from '../types/country-option.types'

export function getCountryOptions(language: Language): CountryOption[] {
  const displayNames = new Intl.DisplayNames([language], { type: 'region' })
  const collator = new Intl.Collator(language)

  return COUNTRY_CODES.map((code) => ({ code, name: displayNames.of(code) ?? code })).sort((first, second) =>
    collator.compare(first.name, second.name),
  )
}
