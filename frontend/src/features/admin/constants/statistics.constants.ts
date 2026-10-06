import { BriefcaseBusinessIcon, ShieldIcon, StoreIcon, UserIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { UserRole } from '@/features/auth/types/user.types'

export const ROLE_STATISTICS: readonly { role: UserRole; icon: LucideIcon }[] = [
  { role: 'CLIENT', icon: UserIcon },
  { role: 'MERCHANT', icon: StoreIcon },
  { role: 'ADMIN', icon: BriefcaseBusinessIcon },
  { role: 'SUPER_ADMIN', icon: ShieldIcon },
]
