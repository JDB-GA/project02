import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/hooks/useLanguage'
import type { KycApplication } from '../types/kyc.types'
import { formatDateTime, formatIsoDate } from '../utils/format-kyc-date'
import { KycDetailRow } from './KycDetailRow'

interface KycDetailsProps {
  application: KycApplication
}

export function KycDetails({ application }: KycDetailsProps) {
  const { t } = useTranslation('kyc')
  const { language } = useLanguage()
  const nationality = new Intl.DisplayNames([language], { type: 'region' }).of(application.nationality)
  const address = [application.block, application.road, application.building, application.flat, application.area]
    .filter(Boolean)
    .join(' · ')

  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      <KycDetailRow label={t('fields.fullName')} value={application.fullName} />
      <KycDetailRow label={t('fields.cprNumber')} value={application.cprNumber} dir="ltr" />
      <KycDetailRow label={t('fields.dateOfBirth')} value={formatIsoDate(application.dateOfBirth, language)} />
      <KycDetailRow label={t('fields.nationality')} value={nationality ?? application.nationality} />
      <KycDetailRow label={t('form.addressTitle')} value={address} />
      <KycDetailRow label={t('statusCard.submittedAt')} value={formatDateTime(application.submittedAt, language)} />
      {application.reviewedAt && (
        <KycDetailRow label={t('statusCard.reviewedAt')} value={formatDateTime(application.reviewedAt, language)} />
      )}
    </dl>
  )
}
