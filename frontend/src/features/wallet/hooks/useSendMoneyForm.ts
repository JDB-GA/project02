import type { SubmitEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { getErrorKey } from '@/lib/api/get-error-key'
import { transferApi } from '../api/transfer.api'
import { WALLET_QUERY_KEYS } from '../constants/wallet.constants'
import { transferSchema } from '../schemas/transfer.schema'
import type { TransferFormInput, TransferFormValues } from '../types/transfer.types'
import { getTransferFieldErrors } from '../utils/get-transfer-field-errors'

const DEFAULT_VALUES: TransferFormInput = { recipient: '', amount: '', note: '' }

export function useSendMoneyForm(onSuccess: () => void) {
  const { t } = useTranslation('wallet')
  const queryClient = useQueryClient()
  const send = useMutation({ mutationFn: transferApi.send })
  const form = useForm<TransferFormInput, unknown, TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  })

  const submit = form.handleSubmit((values) => {
    send.mutate(values, {
      onSuccess: () => {
        toast.success(t('transfer.success'))
        form.reset(DEFAULT_VALUES)
        void queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.all })
        onSuccess()
      },
      onError: (error) => {
        getTransferFieldErrors(error).forEach(({ field, key }) => {
          form.setError(field, { message: key }, { shouldFocus: true })
        })
      },
    })
  })

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void submit(event)
  }

  const hasFieldErrors = send.isError && getTransferFieldErrors(send.error).length > 0

  return {
    form,
    onSubmit,
    isPending: send.isPending,
    errorKey: send.isError && !hasFieldErrors ? getErrorKey(send.error) : null,
  }
}
