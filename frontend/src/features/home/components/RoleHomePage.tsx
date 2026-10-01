import { PageTitle } from '@/components/PageTitle'
import { WelcomeCard } from './WelcomeCard'

interface RoleHomePageProps {
  title: string
  heading: string
}

export function RoleHomePage({ title, heading }: RoleHomePageProps) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted p-4 md:p-10">
      <PageTitle title={title} />
      <WelcomeCard heading={heading} />
    </main>
  )
}
