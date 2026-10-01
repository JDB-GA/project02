import { useTranslation } from 'react-i18next'
import { FieldGroup } from '@/components/ui/field'
import { useVerifyEmailForm } from '../hooks/useVerifyEmailForm'
import { FormErrorMessage } from './FormErrorMessage'
import { FormField } from './FormField'
import { OtpCodeInput } from './OtpCodeInput'
import { SubmitButton } from './SubmitButton'

export function VerifyEmailForm() {
  const { t } = useTranslation('auth')
  const { form, onSubmit, onComplete, isPending, errorKey } = useVerifyEmailForm()

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <FormField control={form.control} name="code" label={t('verify.codeLabel')}>
          {(props) => <OtpCodeInput {...props} onComplete={onComplete} disabled={isPending} autoFocus />}
        </FormField>
        <FormErrorMessage errorKey={errorKey} />
        <SubmitButton isPending={isPending}>{t('verify.submit')}</SubmitButton>
      </FieldGroup>
    </form>
  )
}
