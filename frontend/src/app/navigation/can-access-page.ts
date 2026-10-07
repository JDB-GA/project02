import type { User } from '@/features/auth/types/user.types'
import { canUseWallet } from '@/features/auth/utils/can-use-wallet'
import type { AppPage } from './app-page.types'

export const canAccessPage = (page: AppPage, user: User): boolean =>
  page.roles.includes(user.role) &&
  (!page.permission || user.permissions.includes(page.permission)) &&
  (!page.requiresWallet || canUseWallet(user))
