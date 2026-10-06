import { KeyRoundIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/config/routes'
import { KycDetailRow } from '@/features/kyc/components/KycDetailRow'
import { formatDateTime } from '@/features/kyc/utils/format-kyc-date'
import { useLanguage } from '@/hooks/useLanguage'
import type { Profile } from '../types/profile.types'

interface ProfileDetailsCardProps {
  profile: Profile
}

export function ProfileDetailsCard({ profile }: ProfileDetailsCardProps) {
  const { t } = useTranslation(['profile', 'common', 'users'])
  const { language } = useLanguage()

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{t('profile:details.title')}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
          <KycDetailRow label={t('common:home.email')} value={profile.email} dir="ltr" />
          <KycDetailRow label={t('common:home.mobileNumber')} value={profile.mobileNumber} dir="ltr" />
          {profile.role === 'CLIENT' && (
            <KycDetailRow label={t('profile:details.verification')} value={t(`users:kycStatus.${profile.kycStatus}`)} />
          )}
          <KycDetailRow label={t('profile:details.memberSince')} value={formatDateTime(profile.createdAt, language)} />
        </dl>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline">
          <Link to={ROUTES.changePassword}>
            <KeyRoundIcon data-icon="inline-start" aria-hidden="true" />
            {t('common:home.changePassword')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
