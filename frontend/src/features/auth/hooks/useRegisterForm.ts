import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { ROUTES } from '@/config/routes'
import { registerSchema } from '../schemas/register.schema'
import type { RegisterFormValues } from '../types/auth-form.types'
import { getErrorKey } from '../utils/get-error-key'
import { getRegisterFieldErrors } from '../utils/get-register-field-errors'
import { toRegisterPayload } from '../utils/to-register-payload'
import { useRegister } from './useRegister'

const DEFAULT_VALUES: RegisterFormValues = { email: '', mobileNumber: '', password: '', confirmPassword: '' }

export function useRegisterForm() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const register = useRegister()
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  })

  const onSubmit = form.handleSubmit((values) =>
    register.mutate(toRegisterPayload(values), {
      onSuccess: () => {
        toast.success(t('register.success'))
        void navigate(ROUTES.login)
      },
      onError: (error) => {
        getRegisterFieldErrors(error).forEach(({ field, key }) =>
          form.setError(field, { message: key }, { shouldFocus: true }))
      },
    }))

  const hasFieldErrors = register.isError && getRegisterFieldErrors(register.error).length > 0

  return {
    form,
    onSubmit,
    isPending: register.isPending,
    errorKey: register.isError && !hasFieldErrors ? getErrorKey(register.error) : null,
  }
}
