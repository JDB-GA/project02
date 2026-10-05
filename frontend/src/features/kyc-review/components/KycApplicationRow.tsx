import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { KycStatusBadge } from '@/features/kyc/components/KycStatusBadge'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { useLanguage } from '@/hooks/useLanguage'
import type { KycApplicationSummary } from '../types/kyc-review.types'
import { getKycReviewPath } from '../utils/get-kyc-review-path'

interface KycApplicationRowProps {
  application: KycApplicationSummary
}

export function KycApplicationRow({ application }: KycApplicationRowProps) {
  const { t } = useTranslation('kycReview')
  const { language } = useLanguage()

  return (
    <TableRow>
      <TableCell className="font-medium">{application.fullName}</TableCell>
      <TableCell>
        <bdi dir="ltr">{application.cprNumber}</bdi>
      </TableCell>
      <TableCell className="hidden xl:table-cell">
        <bdi dir="ltr">{application.applicantEmail}</bdi>
      </TableCell>
      <TableCell className="hidden md:table-cell">{formatDateTime(application.submittedAt, language)}</TableCell>
      <TableCell>
        <KycStatusBadge status={application.status} />
      </TableCell>
      <TableCell className="text-end">
        <Button asChild variant="outline" size="sm">
          <Link
            to={getKycReviewPath(application.id)}
            aria-label={t('table.reviewApplication', { name: application.fullName })}
          >
            {t('table.review')}
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  )
}
