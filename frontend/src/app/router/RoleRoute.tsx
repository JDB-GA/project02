import { Navigate, Outlet } from 'react-router'
import type { AppPage } from '@/app/navigation/app-page.types'
import { canAccessPage } from '@/app/navigation/can-access-page'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { getLandingRoute } from './get-landing-route'

interface RoleRouteProps {
  page: AppPage
}

export function RoleRoute({ page }: RoleRouteProps) {
  const { data: user } = useCurrentUser()

  if (!user) {
    return null
  }

  return canAccessPage(page, user) ? <Outlet /> : <Navigate to={getLandingRoute(user)} replace />
}
