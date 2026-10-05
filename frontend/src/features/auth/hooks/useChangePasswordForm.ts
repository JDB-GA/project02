import type { SubmitEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { getErrorKey } from '@/lib/api/get-error-key'
import { authApi } from '../api/auth.api'
import { AUTH_QUERY_KEYS } from '../constants/auth.constants'
import { changePasswordSchema } from '../schemas/change-password.schema'
import type { ChangePasswordFormValues } from '../types/auth-form.types'
import { getChangePasswordFieldError } from '../utils/get-change-password-field-errors'

const DEFAULT_VALUES: ChangePasswordFormValues = { currentPassword: '', newPassword: '', confirmPassword: '' }

export function useChangePasswordForm() {
  const { t } = useTranslation('auth')
  const queryClient = useQueryClient()
  const change = useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, user)
    },
  })
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  })

  const submit = form.handleSubmit(({ currentPassword, newPassword }) => {
    change.mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          toast.success(t('change.success'))
          form.reset(DEFAULT_VALUES)
        },
        onError: (error) => {
          const fieldError = getChangePasswordFieldError(error)
          if (fieldError) {
            form.setError(fieldError.field, { message: fieldError.key }, { shouldFocus: true })
          }
        },
      },
    )
  })

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void submit(event)
  }

  const hasFieldError = change.isError && getChangePasswordFieldError(change.error) !== undefined

  return {
    form,
    onSubmit,
    isPending: change.isPending,
    errorKey: change.isError && !hasFieldError ? getErrorKey(change.error) : null,
  }
}
