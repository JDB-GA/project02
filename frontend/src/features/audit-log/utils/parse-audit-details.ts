import { permissionSchema, userRoleSchema, userStatusSchema } from '@/features/auth/schemas/user.schema'
import { STATUS_CHANGE_SEPARATOR } from '../constants/audit-log.constants'
import type { AuditDetails } from '../types/audit-log.types'

export const parseAuditDetails = (details: string): AuditDetails => {
  const role = userRoleSchema.safeParse(details)
  if (role.success) {
    return { kind: 'role', role: role.data }
  }
  const permission = permissionSchema.safeParse(details)
  if (permission.success) {
    return { kind: 'permission', permission: permission.data }
  }
  const [from, to] = details.split(STATUS_CHANGE_SEPARATOR).map((status) => userStatusSchema.safeParse(status))
  if (from?.success && to?.success) {
    return { kind: 'statusChange', from: from.data, to: to.data }
  }
  return { kind: 'text', text: details }
}
