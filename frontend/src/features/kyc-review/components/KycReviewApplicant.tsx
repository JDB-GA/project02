import { useTranslation } from 'react-i18next'
import { KycDetailRow } from '@/features/kyc/components/KycDetailRow'
import type { KycReview } from '../types/kyc-review.types'

interface KycReviewApplicantProps {
  review: KycReview
}

export function KycReviewApplicant({ review }: KycReviewApplicantProps) {
  const { t } = useTranslation('kycReview')

  return (
    <section aria-labelledby="kyc-review-applicant-title" className="flex flex-col gap-3">
      <h2 id="kyc-review-applicant-title" className="text-sm font-medium">
        {t('detail.applicant')}
      </h2>
      <dl className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
        <KycDetailRow label={t('detail.email')} value={review.applicantEmail} dir="ltr" />
        <KycDetailRow label={t('detail.mobileNumber')} value={review.applicantMobileNumber} dir="ltr" />
        {review.reviewedByEmail && (
          <KycDetailRow label={t('detail.reviewedBy')} value={review.reviewedByEmail} dir="ltr" />
        )}
      </dl>
    </section>
  )
}
