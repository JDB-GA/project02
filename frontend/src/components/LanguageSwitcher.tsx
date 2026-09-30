import { LanguagesIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useLanguageSwitcher } from '@/hooks/useLanguageSwitcher'
import { LANGUAGE_LABELS } from '@/i18n/languages'

export function LanguageSwitcher() {
  const { t } = useTranslation()
  const { nextLanguage, switchLanguage } = useLanguageSwitcher()

  return (
    <Button variant="ghost" size="sm" aria-label={t('language.switch')} onClick={switchLanguage}>
      <LanguagesIcon data-icon="inline-start" aria-hidden="true" />
      <span lang={nextLanguage}>{LANGUAGE_LABELS[nextLanguage]}</span>
    </Button>
  )
}
