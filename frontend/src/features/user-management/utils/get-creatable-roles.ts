import type { User } from '@/features/auth/types/user.types'
import { CREATABLE_ROLES, STAFF_CREATABLE_ROLES } from '../constants/user-management.constants'
import type { CreatableRole } from '../types/user-management.types'

export const getCreatableRoles = (actor: User): readonly CreatableRole[] =>
  actor.role === 'SUPER_ADMIN' ? CREATABLE_ROLES : STAFF_CREATABLE_ROLES
