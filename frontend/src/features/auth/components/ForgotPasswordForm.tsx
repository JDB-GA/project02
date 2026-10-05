import { useTranslation } from 'react-i18next'
import { FormErrorMessage } from '@/components/form/FormErrorMessage'
import { FormField } from '@/components/form/FormField'
import { SubmitButton } from '@/components/form/SubmitButton'
import { FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm'

export function ForgotPasswordForm() {
  const { t } = useTranslation('auth')
  const { form, onSubmit, isPending, errorKey } = useForgotPasswordForm()

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <FormField control={form.control} name="email" label={t('fields.email')}>
          {(props) => <Input {...props} type="email" dir="ltr" autoComplete="email" placeholder={t('fields.emailPlaceholder')} />}
        </FormField>
        <FormErrorMessage errorKey={errorKey} />
        <SubmitButton isPending={isPending}>{t('forgot.submit')}</SubmitButton>
      </FieldGroup>
    </form>
  )
}
