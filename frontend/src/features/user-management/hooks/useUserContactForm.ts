import type { SubmitEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { getErrorKey } from '@/lib/api/get-error-key'
import { userManagementApi } from '../api/user-management.api'
import { userContactSchema } from '../schemas/user-contact.schema'
import type { AdminUser, UserContactFormValues } from '../types/user-management.types'
import { getContactFieldErrors } from '../utils/get-contact-field-errors'
import { toLocalMobile } from '../utils/to-local-mobile'
import { useUserCacheUpdater } from './useUserCacheUpdater'

export function useUserContactForm(user: AdminUser) {
  const { t } = useTranslation('users')
  const { applyUser } = useUserCacheUpdater(user.id)
  const update = useMutation({
    mutationFn: (values: UserContactFormValues) => userManagementApi.updateContact(user.id, values),
    onSuccess: applyUser,
  })
  const form = useForm<UserContactFormValues>({
    resolver: zodResolver(userContactSchema),
    values: { email: user.email, mobileNumber: toLocalMobile(user.mobileNumber) },
    mode: 'onTouched',
  })

  const submit = form.handleSubmit((values) => {
    update.mutate(values, {
      onSuccess: () => toast.success(t('contact.saved')),
      onError: (error) => {
        getContactFieldErrors(error).forEach(({ field, key }) => {
          form.setError(field, { message: key }, { shouldFocus: true })
        })
      },
    })
  })

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void submit(event)
  }

  const hasFieldErrors = update.isError && getContactFieldErrors(update.error).length > 0

  return {
    form,
    onSubmit,
    isPending: update.isPending,
    errorKey: update.isError && !hasFieldErrors ? getErrorKey(update.error) : null,
  }
}
