import { LogOutIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { getErrorKey } from '@/features/auth/utils/get-error-key'

export function HomePage() {
  const { t } = useTranslation()
  const { t: tErrors } = useTranslation('errors')
  const { data: user } = useCurrentUser()
  const logout = useLogout()

  const handleLogout = () => logout.mutate(undefined, { onError: (error) => toast.error(tErrors(getErrorKey(error))) })

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted p-4 md:p-10">
      <title>{`${t('home.title')} · ${t('appName')}`}</title>
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
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted-foreground">{t('home.email')}</dt>
              <dd dir="ltr" className="text-end">{user.email}</dd>
              <dt className="text-muted-foreground">{t('home.mobileNumber')}</dt>
              <dd dir="ltr" className="text-end">{user.mobileNumber}</dd>
              <dt className="text-muted-foreground">{t('home.role')}</dt>
              <dd className="text-end">{t(`roles.${user.role}`)}</dd>
            </dl>
          </CardContent>
        )}
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={handleLogout} disabled={logout.isPending}>
            {logout.isPending ? <Spinner data-icon="inline-start" /> : <LogOutIcon data-icon="inline-start" />}
            {t('home.logout')}
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
