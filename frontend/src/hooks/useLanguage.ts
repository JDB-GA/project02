import { useTranslation } from 'react-i18next'
import type { Language } from '@/i18n/i18n.types'
import { DEFAULT_LANGUAGE, LANGUAGE_DIRECTIONS, isLanguage } from '@/i18n/languages'

export function useLanguage() {
  const { i18n } = useTranslation()
  const resolvedLanguage = i18n.resolvedLanguage ?? DEFAULT_LANGUAGE
  const language: Language = isLanguage(resolvedLanguage) ? resolvedLanguage : DEFAULT_LANGUAGE

  const changeLanguage = async (nextLanguage: Language): Promise<void> => {
    await i18n.changeLanguage(nextLanguage)
  }

  return {
    language,
    direction: LANGUAGE_DIRECTIONS[language],
    changeLanguage,
  }
}
