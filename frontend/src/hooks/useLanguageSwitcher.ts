import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/i18n/languages'
import { useLanguage } from './useLanguage'

export function useLanguageSwitcher() {
  const { language, changeLanguage } = useLanguage()
  const nextLanguage = SUPPORTED_LANGUAGES.find((candidate) => candidate !== language) ?? DEFAULT_LANGUAGE

  const switchLanguage = () => {
    void changeLanguage(nextLanguage)
  }

  return { nextLanguage, switchLanguage }
}
