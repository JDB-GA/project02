import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { LogoutButton } from '@/features/auth/components/LogoutButton'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { UserDetails } from './UserDetails'

export function WelcomeCard() {
  const { t } = useTranslation()
  const { data: user } = useCurrentUser()

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          <h1>{t('home.welcome')}</h1>
        </CardTitle>
        <CardAction>
          <LanguageSwitcher />
        </CardAction>
      </CardHeader>
      {user && (
        <CardContent>
          <UserDetails user={user} />
        </CardContent>
      )}
      <CardFooter>
        <LogoutButton />
      </CardFooter>
    </Card>
  )
}
