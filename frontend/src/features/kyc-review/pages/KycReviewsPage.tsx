import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KycApplicationsList } from '../components/KycApplicationsList'
import { KycStatusFilterTabs } from '../components/KycStatusFilterTabs'
import { useKycReviewFilters } from '../hooks/useKycReviewFilters'

export function KycReviewsPage() {
  const { t } = useTranslation()
  const { status, page, setStatus, setPage } = useKycReviewFilters()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('areas.kycReviews.title')} />
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>
            <h1>{t('areas.kycReviews.heading')}</h1>
          </CardTitle>
          <KycStatusFilterTabs value={status} onChange={setStatus} />
        </CardHeader>
        <CardContent>
          <KycApplicationsList query={{ status, page }} onPageChange={setPage} />
        </CardContent>
      </Card>
    </div>
  )
}
