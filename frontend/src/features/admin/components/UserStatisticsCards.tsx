import { UsersIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { useLanguage } from '@/hooks/useLanguage'
import { ROLE_STATISTICS } from '../constants/statistics.constants'
import { useUserStatistics } from '../hooks/useUserStatistics'
import { StatisticCard } from './StatisticCard'

export function UserStatisticsCards() {
  const { t } = useTranslation(['statistics', 'common'])
  const { language } = useLanguage()
  const { data, isError, refetch } = useUserStatistics()
  const format = (count: number | undefined) => (count === undefined ? undefined : count.toLocaleString(language))

  if (isError) {
    return (
      <LoadErrorAlert
        message={t('statistics:loadError')}
        onRetry={() => {
          void refetch()
        }}
      />
    )
  }

  return (
    <section aria-label={t('statistics:users.title')} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatisticCard label={t('statistics:users.total')} icon={UsersIcon} value={format(data?.totalUsers)} />
      {ROLE_STATISTICS.map(({ role, icon }) => (
        <StatisticCard key={role} label={t(`statistics:users.roles.${role}`)} icon={icon} value={format(data?.usersByRole[role])} />
      ))}
    </section>
  )
}
