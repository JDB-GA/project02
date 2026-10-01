import { Navigate, Outlet } from 'react-router'
import { FullPageSpinner } from '@/components/FullPageSpinner'
import { ROUTES } from '@/config/routes'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { getLandingRoute } from './get-landing-route'

export function AuthenticatedRoute() {
  const { data: user, isPending } = useCurrentUser()

  if (isPending) {
    return <FullPageSpinner />
  }
  if (!user) {
    return <Navigate to={ROUTES.login} replace />
  }

  return user.emailVerified ? <Outlet /> : <Navigate to={getLandingRoute(user)} replace />
}
