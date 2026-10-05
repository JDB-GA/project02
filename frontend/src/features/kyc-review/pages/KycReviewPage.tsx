import { ArrowLeftIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router'
import { PageTitle } from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { KycReviewContent } from '../components/KycReviewContent'

export function KycReviewPage() {
  const { t } = useTranslation(['common', 'kycReview'])
  const { applicationId } = useParams()

  if (!applicationId) {
    return <Navigate to={ROUTES.kycReviews} replace />
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <PageTitle title={t('areas.kycReview.title')} />
      <Button asChild variant="ghost" size="sm" className="self-start">
        <Link to={ROUTES.kycReviews}>
          <ArrowLeftIcon data-icon="inline-start" className="rtl:rotate-180" aria-hidden="true" />
          {t('kycReview:detail.back')}
        </Link>
      </Button>
      <KycReviewContent applicationId={applicationId} />
    </div>
  )
}
