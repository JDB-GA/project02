import type { SubmitEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { getErrorKey } from '@/lib/api/get-error-key'
import { kycFormSchema } from '../schemas/kyc-form.schema'
import type { KycApplication, KycFormInput, KycFormValues } from '../types/kyc.types'
import { getKycFieldErrors } from '../utils/get-kyc-field-errors'
import { toKycFormDefaults } from '../utils/to-kyc-form-defaults'
import { toKycFormData } from '../utils/to-kyc-form-data'
import { useSubmitKyc } from './useSubmitKyc'

export function useKycForm(previous: KycApplication | null) {
  const { t } = useTranslation('kyc')
  const submitKyc = useSubmitKyc()
  const form = useForm<KycFormInput, unknown, KycFormValues>({
    resolver: zodResolver(kycFormSchema),
    defaultValues: toKycFormDefaults(previous),
    mode: 'onTouched',
  })

  const submit = form.handleSubmit((values) => {
    submitKyc.mutate(toKycFormData(values), {
      onSuccess: () => {
        toast.success(t('form.success'))
      },
      onError: (error) => {
        getKycFieldErrors(error).forEach(({ field, key }) => {
          form.setError(field, { message: key }, { shouldFocus: true })
        })
      },
    })
  })

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void submit(event)
  }

  const hasFieldErrors = submitKyc.isError && getKycFieldErrors(submitKyc.error).length > 0

  return {
    form,
    onSubmit,
    isPending: submitKyc.isPending,
    errorKey: submitKyc.isError && !hasFieldErrors ? getErrorKey(submitKyc.error) : null,
  }
}
