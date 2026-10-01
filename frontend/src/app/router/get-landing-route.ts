import { ROUTES } from '@/config/routes'
import type { User } from '@/features/auth/types/user.types'
import { ROLE_START_ROUTES } from './role-routes'

export const getLandingRoute = (user: User): string =>
  user.emailVerified ? ROLE_START_ROUTES[user.role] : ROUTES.verifyEmail
