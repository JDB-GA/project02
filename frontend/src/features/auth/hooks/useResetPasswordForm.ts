import type { SubmitEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { ROUTES } from '@/config/routes'
import { getErrorKey } from '@/lib/api/get-error-key'
import { authApi } from '../api/auth.api'
import { resetPasswordSchema } from '../schemas/reset-password.schema'
import type { ResetPasswordFormValues } from '../types/auth-form.types'
import { getResetEmail } from '../utils/get-reset-email'

export function useResetPasswordForm() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const location = useLocation()
  const reset = useMutation({ mutationFn: authApi.resetPassword })
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: getResetEmail(location.state), code: '', newPassword: '', confirmPassword: '' },
    mode: 'onTouched',
  })

  const submit = form.handleSubmit(({ email, code, newPassword }) => {
    reset.mutate(
      { email, code, newPassword },
      {
        onSuccess: () => {
          toast.success(t('reset.success'))
          void navigate(ROUTES.login, { replace: true })
        },
        onError: () => {
          form.resetField('code')
        },
      },
    )
  })

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void submit(event)
  }

  return { form, onSubmit, isPending: reset.isPending, errorKey: reset.isError ? getErrorKey(reset.error) : null }
}
