import type { SubmitEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { UseMutationResult } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { getErrorKey } from '@/lib/api/get-error-key'
import { rejectKycSchema } from '../schemas/reject-kyc.schema'
import type { KycReview, RejectKycFormValues } from '../types/kyc-review.types'

export function useRejectKycForm(
  reject: UseMutationResult<KycReview, Error, RejectKycFormValues>,
  onRejected: () => void,
) {
  const { t } = useTranslation('kycReview')
  const form = useForm<RejectKycFormValues>({
    resolver: zodResolver(rejectKycSchema),
    defaultValues: { reason: '' },
    mode: 'onTouched',
  })

  const submit = form.handleSubmit((values) => {
    reject.mutate(values, {
      onSuccess: () => {
        toast.success(t('actions.rejected'))
        form.reset()
        onRejected()
      },
    })
  })

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void submit(event)
  }

  return { form, onSubmit, errorKey: reject.isError ? getErrorKey(reject.error) : null }
}
