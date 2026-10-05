import type { SubmitEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { getErrorKey } from '@/lib/api/get-error-key'
import { walletApi } from '../api/wallet.api'
import { WALLET_QUERY_KEYS } from '../constants/wallet.constants'
import { topUpSchema } from '../schemas/top-up.schema'
import type { TopUpFormInput, TopUpFormValues } from '../types/wallet.types'
import { getTopUpFieldErrors } from '../utils/get-top-up-field-errors'

const DEFAULT_VALUES: TopUpFormInput = { source: '', amount: '' }

export function useTopUpForm(onSuccess: () => void) {
  const { t } = useTranslation('wallet')
  const queryClient = useQueryClient()
  const topUp = useMutation({ mutationFn: walletApi.topUp })
  const form = useForm<TopUpFormInput, unknown, TopUpFormValues>({
    resolver: zodResolver(topUpSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  })

  const submit = form.handleSubmit((values) => {
    topUp.mutate(values, {
      onSuccess: () => {
        toast.success(t('topUp.success'))
        form.reset(DEFAULT_VALUES)
        void queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.all })
        onSuccess()
      },
      onError: (error) => {
        getTopUpFieldErrors(error).forEach(({ field, key }) => {
          form.setError(field, { message: key }, { shouldFocus: true })
        })
      },
    })
  })

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void submit(event)
  }

  const hasFieldErrors = topUp.isError && getTopUpFieldErrors(topUp.error).length > 0

  return {
    form,
    onSubmit,
    isPending: topUp.isPending,
    errorKey: topUp.isError && !hasFieldErrors ? getErrorKey(topUp.error) : null,
  }
}
