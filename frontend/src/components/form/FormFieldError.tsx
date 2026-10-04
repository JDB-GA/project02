import { useTranslation } from 'react-i18next'
import { FieldError } from '@/components/ui/field'
import { isValidationKey } from '@/i18n/keys'
import { VALIDATION_PARAMS } from '@/config/validation-params'

interface FormFieldErrorProps {
  id: string
  message: string | undefined
}

export function FormFieldError({ id, message }: FormFieldErrorProps) {
  const { t } = useTranslation('validation')

  if (!message) {
    return null
  }

  return <FieldError id={id}>{t(isValidationKey(message) ? message : 'invalid', VALIDATION_PARAMS)}</FieldError>
}
