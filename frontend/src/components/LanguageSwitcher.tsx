import { LanguagesIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { DEFAULT_LANGUAGE, LANGUAGE_LABELS, SUPPORTED_LANGUAGES } from '@/i18n/languages'

export function LanguageSwitcher() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()
  const nextLanguage = SUPPORTED_LANGUAGES.find((candidate) => candidate !== language) ?? DEFAULT_LANGUAGE

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={t('language.switch')}
      onClick={() => void changeLanguage(nextLanguage)}
    >
      <LanguagesIcon data-icon="inline-start" aria-hidden="true" />
      <span lang={nextLanguage}>{LANGUAGE_LABELS[nextLanguage]}</span>
    </Button>
  )
}
