import { ROUTES } from '@/config/routes'
import type { UserRole } from '@/features/auth/types/user.types'

export const ROLE_START_ROUTES: Readonly<Record<UserRole, string>> = {
  CLIENT: ROUTES.wallet,
  MERCHANT: ROUTES.merchant,
  ADMIN: ROUTES.admin,
  SUPER_ADMIN: ROUTES.admin,
}
