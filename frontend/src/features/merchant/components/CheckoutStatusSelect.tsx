import { useTranslation } from 'react-i18next'
import { TransactionsFilterSelect } from '@/features/wallet/components/TransactionsFilterSelect'
import { ALL_STATUSES_FILTER, CHECKOUT_STATUS_FILTERS } from '../constants/merchant.constants'
import type { CheckoutStatusFilter } from '../types/merchant.types'

interface CheckoutStatusSelectProps {
  value: CheckoutStatusFilter
  onChange: (status: CheckoutStatusFilter) => void
}

export function CheckoutStatusSelect({ value, onChange }: CheckoutStatusSelectProps) {
  const { t } = useTranslation('merchant')

  return (
    <TransactionsFilterSelect
      label={t('payments.filter')}
      value={value}
      options={CHECKOUT_STATUS_FILTERS}
      getOptionLabel={(status) => (status === ALL_STATUSES_FILTER ? t('payments.allStatuses') : t(`status.${status}`))}
      onChange={onChange}
    />
  )
}
