import { useTranslation } from 'react-i18next'
import { FieldGroup } from '@/components/ui/field'
import { useVerifyEmailForm } from '../hooks/useVerifyEmailForm'
import { FormErrorMessage } from '@/components/form/FormErrorMessage'
import { FormField } from '@/components/form/FormField'
import { OtpCodeInput } from './OtpCodeInput'
import { SubmitButton } from '@/components/form/SubmitButton'

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
