import type { SubmitEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { WALLET_QUERY_KEYS } from '@/features/wallet/constants/wallet.constants'
import { getErrorKey } from '@/lib/api/get-error-key'
import { profileApi } from '../api/profile.api'
import { PROFILE_QUERY_KEYS } from '../constants/profile.constants'
import { businessNameSchema } from '../schemas/business-name.schema'
import type { BusinessNameValues, Profile } from '../types/profile.types'

export function useBusinessNameForm(profile: Profile) {
  const { t } = useTranslation('profile')
  const queryClient = useQueryClient()
  const update = useMutation({ mutationFn: profileApi.updateName })
  const form = useForm<BusinessNameValues>({
    resolver: zodResolver(businessNameSchema),
    defaultValues: { displayName: profile.name === profile.email ? '' : profile.name },
    mode: 'onTouched',
  })

  const submit = form.handleSubmit((values) => {
    update.mutate(values, {
      onSuccess: (updated) => {
        toast.success(t('business.saved'))
        queryClient.setQueryData(PROFILE_QUERY_KEYS.profile, updated)
        form.reset({ displayName: updated.name })
        void queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.all })
      },
    })
  })

  return {
    form,
    onSubmit: (event: SubmitEvent<HTMLFormElement>) => {
      void submit(event)
    },
    isPending: update.isPending,
    errorKey: update.isError ? getErrorKey(update.error) : null,
  }
}
