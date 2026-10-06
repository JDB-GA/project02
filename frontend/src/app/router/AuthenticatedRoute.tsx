import { Navigate, Outlet, useLocation } from 'react-router'
import { FullPageSpinner } from '@/components/FullPageSpinner'
import { ROUTES } from '@/config/routes'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { getLandingRoute } from './get-landing-route'

export function AuthenticatedRoute() {
  const { data: user, isPending } = useCurrentUser()
  const { pathname } = useLocation()

  if (isPending) {
    return <FullPageSpinner />
  }

  if (!user) {
    return <Navigate to={ROUTES.login} state={{ from: pathname }} replace />
  }

  return user.emailVerified ? <Outlet /> : <Navigate to={getLandingRoute(user)} replace />
}
