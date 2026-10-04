import { useTranslation } from 'react-i18next'
import { FormErrorMessage } from '@/components/form/FormErrorMessage'
import { SubmitButton } from '@/components/form/SubmitButton'
import { FieldGroup, FieldSeparator } from '@/components/ui/field'
import { useKycForm } from '../hooks/useKycForm'
import type { KycApplication } from '../types/kyc.types'
import { KycAddressFields } from './KycAddressFields'
import { KycDocumentFields } from './KycDocumentFields'
import { KycPersonalFields } from './KycPersonalFields'

interface KycFormProps {
  previous: KycApplication | null
}

export function KycForm({ previous }: KycFormProps) {
  const { t } = useTranslation('kyc')
  const { form, onSubmit, isPending, errorKey } = useKycForm(previous)

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <KycPersonalFields control={form.control} />
        <FieldSeparator />
        <KycAddressFields control={form.control} />
        <FieldSeparator />
        <KycDocumentFields control={form.control} />
        <FormErrorMessage errorKey={errorKey} />
        <SubmitButton isPending={isPending}>{t('form.submit')}</SubmitButton>
      </FieldGroup>
    </form>
  )
}
