import { useTranslation } from 'react-i18next'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { KYC_STATUS_FILTERS } from '../constants/kyc-review.constants'
import type { KycStatusFilter } from '../types/kyc-review.types'

interface KycStatusFilterTabsProps {
  value: KycStatusFilter
  onChange: (status: KycStatusFilter) => void
}

export function KycStatusFilterTabs({ value, onChange }: KycStatusFilterTabsProps) {
  const { t } = useTranslation('kycReview')

  return (
    <Tabs
      value={value}
      onValueChange={(next) => {
        const status = KYC_STATUS_FILTERS.find((filter) => filter === next)
        if (status) {
          onChange(status)
        }
      }}
    >
      <TabsList aria-label={t('filters.label')}>
        {KYC_STATUS_FILTERS.map((status) => (
          <TabsTrigger key={status} value={status}>
            {t(`filters.${status}`)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
