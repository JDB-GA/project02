import type { SubmitEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { ROUTES } from '@/config/routes'
import { getErrorKey } from '@/lib/api/get-error-key'
import { authApi } from '../api/auth.api'
import { forgotPasswordSchema } from '../schemas/forgot-password.schema'
import type { ResetPasswordLocationState } from '../types/auth.types'
import type { ForgotPasswordFormValues } from '../types/auth-form.types'

export function useForgotPasswordForm() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const forgot = useMutation({ mutationFn: authApi.forgotPassword })
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onTouched',
  })

  const submit = form.handleSubmit((values) => {
    forgot.mutate(values, {
      onSuccess: () => {
        toast.success(t('forgot.sent'))
        const state: ResetPasswordLocationState = { email: values.email }
        void navigate(ROUTES.resetPassword, { state })
      },
    })
  })

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void submit(event)
  }

  return { form, onSubmit, isPending: forgot.isPending, errorKey: forgot.isError ? getErrorKey(forgot.error) : null }
}
