import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { KycVerificationContent } from '../components/KycVerificationContent'

export function VerificationPage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <PageTitle title={t('areas.verification.title')} />
      <KycVerificationContent />
    </div>
  )
}
