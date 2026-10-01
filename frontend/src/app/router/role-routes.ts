import { ROUTES } from '@/config/routes'
import type { UserRole } from '@/features/auth/types/user.types'

export const ROLE_START_ROUTES: Readonly<Record<UserRole, string>> = {
  CLIENT: ROUTES.wallet,
  MERCHANT: ROUTES.merchant,
  ADMIN: ROUTES.admin,
  SUPER_ADMIN: ROUTES.admin,
}

export const CLIENT_ROLES: readonly UserRole[] = ['CLIENT']
export const MERCHANT_ROLES: readonly UserRole[] = ['MERCHANT']
export const ADMIN_ROLES: readonly UserRole[] = ['ADMIN', 'SUPER_ADMIN']
