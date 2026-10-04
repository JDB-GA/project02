import type { SubmitEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { isApiError } from '@/lib/api/api-error'
import { AUTH_QUERY_KEYS } from '../constants/auth.constants'
import { verifyEmailSchema } from '../schemas/verify-email.schema'
import type { VerifyEmailFormValues } from '../types/auth-form.types'
import { getErrorKey } from '@/lib/api/get-error-key'
import { useVerifyEmail } from './useVerifyEmail'

const ALREADY_VERIFIED_CODE = 'EMAIL_ALREADY_VERIFIED'
const DEFAULT_VALUES: VerifyEmailFormValues = { code: '' }

export function useVerifyEmailForm() {
  const { t } = useTranslation('auth')
  const queryClient = useQueryClient()
  const verifyEmail = useVerifyEmail()
  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: DEFAULT_VALUES,
  })

  const submit = form.handleSubmit((values) => {
    verifyEmail.mutate(values, {
      onSuccess: () => {
        toast.success(t('verify.success'))
      },
      onError: (error) => {
        form.resetField('code')
        if (isApiError(error) && error.code === ALREADY_VERIFIED_CODE) {
          void queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser })
        }
      },
    })
  })

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void submit(event)
  }

  const onComplete = () => {
    void submit()
  }

  return {
    form,
    onSubmit,
    onComplete,
    isPending: verifyEmail.isPending,
    errorKey: verifyEmail.isError ? getErrorKey(verifyEmail.error) : null,
  }
}
