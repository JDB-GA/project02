import { Navigate, Outlet } from 'react-router'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import type { Permission, UserRole } from '@/features/auth/types/user.types'
import { getLandingRoute } from './get-landing-route'

interface RoleRouteProps {
  roles: readonly UserRole[]
  permission?: Permission
}

export function RoleRoute({ roles, permission }: RoleRouteProps) {
  const { data: user } = useCurrentUser()

  if (!user) {
    return null
  }

  const isAllowed = roles.includes(user.role) && (!permission || user.permissions.includes(permission))

  return isAllowed ? <Outlet /> : <Navigate to={getLandingRoute(user)} replace />
}
