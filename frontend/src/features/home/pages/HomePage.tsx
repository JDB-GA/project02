import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { WelcomeCard } from '../components/WelcomeCard'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted p-4 md:p-10">
      <PageTitle title={t('home.title')} />
      <WelcomeCard />
    </main>
  )
}
