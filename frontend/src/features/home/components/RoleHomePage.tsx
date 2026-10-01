import { PageTitle } from '@/components/PageTitle'
import { WelcomeCard } from './WelcomeCard'

interface RoleHomePageProps {
  title: string
  heading: string
}

export function RoleHomePage({ title, heading }: RoleHomePageProps) {
  return (
    <>
      <PageTitle title={title} />
      <WelcomeCard heading={heading} />
    </>
  )
}
