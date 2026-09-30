import { useTranslation } from 'react-i18next'
import { FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useLoginForm } from '../hooks/useLoginForm'
import { FormErrorMessage } from './FormErrorMessage'
import { FormField } from './FormField'
import { PasswordInput } from './PasswordInput'
import { SubmitButton } from './SubmitButton'

export function LoginForm() {
  const { t } = useTranslation('auth')
  const { form, onSubmit, isPending, errorKey } = useLoginForm()

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <FormField control={form.control} name="identifier" label={t('fields.identifier')}>
          {(props) => (
            <Input {...props} type="text" dir="ltr" autoComplete="username" placeholder={t('fields.identifierPlaceholder')} />
          )}
        </FormField>
        <FormField control={form.control} name="password" label={t('fields.password')}>
          {(props) => <PasswordInput {...props} autoComplete="current-password" />}
        </FormField>
        <FormErrorMessage errorKey={errorKey} />
        <SubmitButton isPending={isPending}>{t('login.submit')}</SubmitButton>
      </FieldGroup>
    </form>
  )
}
