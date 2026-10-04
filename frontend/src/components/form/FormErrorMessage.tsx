import { useTranslation } from 'react-i18next'
import { FieldError } from '@/components/ui/field'
import type { ErrorKey } from '@/i18n/i18n.types'

interface FormErrorMessageProps {
  errorKey: ErrorKey | null
}

export function FormErrorMessage({ errorKey }: FormErrorMessageProps) {
  const { t } = useTranslation('errors')

  if (!errorKey) {
    return null
  }

  return <FieldError className="text-center">{t(errorKey)}</FieldError>
}
