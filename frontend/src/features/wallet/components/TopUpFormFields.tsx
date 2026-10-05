import type { Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FormField } from '@/components/form/FormField'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/hooks/useLanguage'
import { AMOUNT_PLACEHOLDER, CURRENCY } from '../constants/wallet.constants'
import type { TopUpFormInput, TopUpFormValues, TopUpOptions } from '../types/wallet.types'
import { formatMoney } from '../utils/format-money'
import { TopUpSourceSelect } from './TopUpSourceSelect'

interface TopUpFormFieldsProps {
  control: Control<TopUpFormInput, unknown, TopUpFormValues>
  options: TopUpOptions
}

export function TopUpFormFields({ control, options }: TopUpFormFieldsProps) {
  const { t } = useTranslation('wallet')
  const { language } = useLanguage()
  const limits = {
    max: formatMoney(options.maxAmount, language),
    remaining: formatMoney(options.remainingToday, language),
    daily: formatMoney(options.dailyLimit, language),
  }

  return (
    <>
      <FormField control={control} name="source" label={t('topUp.source')}>
        {(props) => <TopUpSourceSelect {...props} sources={options.sources} />}
      </FormField>
      <FormField control={control} name="amount" label={t('topUp.amount', { currency: CURRENCY })} description={t('topUp.limits', limits)}>
        {(props) => <Input {...props} dir="ltr" inputMode="decimal" autoComplete="off" placeholder={AMOUNT_PLACEHOLDER} />}
      </FormField>
    </>
  )
}
